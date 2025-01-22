"use client";

import { Box, Button, Container, Stack } from "@mui/material";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  // Don't show navbar on authenticated routes
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <Box
      component="nav"
      sx={{
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Brand */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <Box
              component="span"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
            >
              Hudson Digital Solutions
            </Box>
          </Link>

          {/* Navigation Links - Centered */}
          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
            sx={{ flexGrow: 1, justifyContent: "center" }}
          >
            <Link href="/about" style={{ textDecoration: "none" }}>
              <Box
                component="span"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  "&:hover": { color: "primary.main" },
                }}
              >
                About
              </Box>
            </Link>
            <Link href="/features" style={{ textDecoration: "none" }}>
              <Box
                component="span"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  "&:hover": { color: "primary.main" },
                }}
              >
                Features
              </Box>
            </Link>
            <Link href="/pricing" style={{ textDecoration: "none" }}>
              <Box
                component="span"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  "&:hover": { color: "primary.main" },
                }}
              >
                Pricing
              </Box>
            </Link>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <Box
                component="span"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  "&:hover": { color: "primary.main" },
                }}
              >
                Contact
              </Box>
            </Link>
          </Stack>

          {/* Auth Buttons */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Link href={"/auth/login" as Route} passHref>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "primary.lighter",
                  },
                }}
              >
                Sign In
              </Button>
            </Link>
            <Link href={"/auth/register" as Route} passHref>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: 2,
                  "&:hover": {
                    bgcolor: "primary.dark",
                    boxShadow: 4,
                  },
                }}
              >
                Start Free Trial
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
