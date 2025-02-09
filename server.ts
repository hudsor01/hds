import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { z } from 'zod'
import { watch } from 'chokidar'
import { ESLint } from 'eslint'
import prettier from 'prettier'
import { exec } from 'child_process'
import path from 'path'
import { promisify } from 'util'
import { readFile, readdir } from 'fs/promises'

// Type definitions
interface ServerConfig {
  port: number
  projectRoot: string
  cursorApiKey: string
}

interface AnalysisResult {
  type: 'lint' | 'dependency' | 'documentation' | 'error'
  content: unknown
  timestamp: string
}

// Configuration schema
const configSchema = z.object({
  port: z.number().min(1024).max(65535),
  projectRoot: z.string(),
  cursorApiKey: z.string().min(32),
})

// Initialize Express app with middleware
const app = express()
app.use(cors())
app.use(express.json())

class DevServer {
  private config: ServerConfig
  private fileWatcher: ReturnType<typeof watch>
  private eslint: ESLint
  private cache: Map<string, AnalysisResult>

  constructor(config: ServerConfig) {
    this.config = configSchema.parse(config)
    this.cache = new Map()

    // Initialize ESLint
    this.eslint = new ESLint({
      useEslintrc: true,
      fix: true,
    })

    // Set up file watcher
    this.fileWatcher = watch(this.config.projectRoot, {
      ignored: [
        /(^|[\/\\])\../, // Ignore dot files
        '**/node_modules/**',
        '**/*.{jpg,png,gif,svg,ico}',
      ],
      persistent: true,
    })

    this.setupRoutes()
    this.setupWatcher()
  }

  private setupRoutes(): void {
    // Natural language query endpoint
    app.post('/api/query', async (req, res) => {
      try {
        const { query } = req.body
        const result = await this.processNaturalLanguageQuery(query)
        res.json(result)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    })

    // Code analysis endpoint
    app.post('/api/analyze', async (req, res) => {
      try {
        const { filePath } = req.body
        const result = await this.analyzeFile(filePath)
        res.json(result)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    })

    // Dependency check endpoint
    app.get('/api/dependencies', async (req, res) => {
      try {
        const deps = await this.checkDependencies()
        res.json(deps)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    })
  }

  private setupWatcher(): void {
    this.fileWatcher
      .on('change', async (path) => {
        console.log(`File ${path} has been changed`)
        // Invalidate cache for changed file
        this.cache.delete(path)
        // Trigger reanalysis
        await this.analyzeFile(path)
      })
      .on('error', (error) => console.error(`Watcher error: ${error}`))
  }

  private async processNaturalLanguageQuery(query: string): Promise<unknown> {
    // TODO: Implement natural language processing
    // This would integrate with Cursor AI's API
    return { message: 'Query processing not yet implemented' }
  }

  private async analyzeFile(filePath: string): Promise<AnalysisResult> {
    const cached = this.cache.get(filePath)
    if (cached) return cached

    const fullPath = path.join(this.config.projectRoot, filePath)
    const content = await readFile(fullPath, 'utf-8')

    // Run ESLint
    const lintResults = await this.eslint.lintText(content, {
      filePath: fullPath,
    })

    // Format with Prettier
    const formattedCode = await prettier.format(content, {
      parser: path.extname(filePath).slice(1),
    })

    const result: AnalysisResult = {
      type: 'lint',
      content: {
        lintResults,
        formattedCode,
      },
      timestamp: new Date().toISOString(),
    }

    this.cache.set(filePath, result)
    return result
  }

  private async checkDependencies(): Promise<unknown> {
    const execAsync = promisify(exec)
    try {
      const { stdout } = await execAsync('yarn outdated --json')
      return JSON.parse(stdout)
    } catch (error) {
      console.error('Error checking dependencies:', error)
      return { error: 'Failed to check dependencies' }
    }
  }

  public start(): void {
    const server = createServer(app)
    server.listen(this.config.port, () => {
      console.log(`Development server running on port ${this.config.port}`)
    })
  }
}

export { DevServer, type ServerConfig }
