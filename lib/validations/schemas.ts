import { z } from 'zod';

// Common field schemas
const idSchema = z.string().uuid();
const emailSchema = z.string().email();
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/);
const passwordSchema = z
	.string()
	.min(8)
	.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
const dateSchema = z.string().datetime();
const currencySchema = z.number().min(0).multipleOf(0.01);

// Property schemas
export const propertySchema = z.object({
	id: idSchema.optional(),
	name: z.string().min(1),
	address: z.string().min(1),
	city: z.string().min(1),
	state: z.string().min(1),
	zip: z.string().min(5),
	property_type: z.enum(['apartment', 'house', 'condo', 'townhouse', 'commercial']),
	property_status: z.enum(['active', 'inactive', 'maintenance', 'sold']),
	rent_amount: currencySchema,
	description: z.string().optional(),
	created_at: dateSchema.optional(),
	updated_at: dateSchema.optional(),
	user_id: idSchema.optional(),
});

// Tenant schemas
export const tenantSchema = z.object({
	id: idSchema.optional(),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: emailSchema,
	phone: phoneSchema,
	status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']),
});

// Lease schemas
export const leaseSchema = z.object({
	id: idSchema.optional(),
	propertyId: idSchema,
	tenantId: idSchema,
	startDate: dateSchema,
	endDate: dateSchema,
	rentAmount: currencySchema,
	depositAmount: currencySchema,
	status: z.enum(['ACTIVE', 'EXPIRED', 'TERMINATED']),
});

// Maintenance schemas
export const maintenanceSchema = z.object({
	id: idSchema.optional(),
	propertyId: idSchema,
	title: z.string().min(1),
	description: z.string().min(1),
	priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
	status: z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
	requestedBy: idSchema,
	assignedTo: idSchema.optional(),
	dueDate: dateSchema.optional(),
});

// Auth schemas
export const signUpSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
	firstName: z.string().min(1),
	lastName: z.string().min(1),
});

export const signInSchema = z.object({
	email: emailSchema,
	password: z.string().min(1),
});

export const resetPasswordSchema = z.object({
	email: emailSchema,
});

export const updatePasswordSchema = z
	.object({
		currentPassword: z.string().min(1),
		newPassword: passwordSchema,
		confirmPassword: z.string().min(1),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

// Settings schemas
export const userSettingsSchema = z.object({
	notifications: z.object({
		email: z.boolean(),
		push: z.boolean(),
		sms: z.boolean(),
	}),
	theme: z.enum(['LIGHT', 'DARK', 'SYSTEM']),
	language: z.enum(['en', 'es', 'fr']),
});

// Export all schemas
export const schemas = {
	property: propertySchema,
	tenant: tenantSchema,
	lease: leaseSchema,
	maintenance: maintenanceSchema,
	signUp: signUpSchema,
	signIn: signInSchema,
	resetPassword: resetPasswordSchema,
	updatePassword: updatePasswordSchema,
	userSettings: userSettingsSchema,
} as const;
