'use client';

import { useState } from 'react';

export interface FormField {
	name: string;
	label: string;
	type: 'text' | 'email' | 'textarea' | 'select';
	required?: boolean;
	placeholder?: string;
	options?: Array<{ value: string; label: string }>;
	validation?: (value: string) => string | null;
}

export interface UseFormOptions<T> {
	initialData: T;
	onSubmit: (data: T) => Promise<void>;
	fields: FormField[];
}

export interface UseFormReturn<T> {
	formData: T;
	errors: Record<string, string>;
	isSubmitting: boolean;
	submitStatus: 'idle' | 'success' | 'error';
	handleInputChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => void;
	handleSubmit: (e: React.FormEvent) => Promise<void>;
	resetForm: () => void;
}

/**
 * Custom hook for managing form state and validation
 * @param options - Form configuration options
 * @returns Form state and handlers
 */
export function useForm<T extends Record<string, string>>({
	initialData,
	onSubmit,
	fields,
}: UseFormOptions<T>): UseFormReturn<T> {
	const [formData, setFormData] = useState<T>(initialData);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error for this field when user starts typing
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		fields.forEach((field) => {
			const value = formData[field.name as keyof T] as string;

			// Required field validation
			if (field.required && !value.trim()) {
				newErrors[field.name] = `${field.label} is required`;
				return;
			}

			// Custom validation
			if (field.validation && value.trim()) {
				const validationError = field.validation(value);
				if (validationError) {
					newErrors[field.name] = validationError;
				}
			}
		});

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setSubmitStatus('idle');

		try {
			await onSubmit(formData);
			setSubmitStatus('success');
			resetForm();
		} catch (error) {
			console.error('Form submission error:', error);
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	};

	const resetForm = () => {
		setFormData(initialData);
		setErrors({});
		setSubmitStatus('idle');
	};

	return {
		formData,
		errors,
		isSubmitting,
		submitStatus,
		handleInputChange,
		handleSubmit,
		resetForm,
	};
}
