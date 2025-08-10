interface InputFieldProps {
	readonly label: string;
	readonly name: string;
	readonly type?: 'text' | 'email' | 'textarea' | 'select';
	readonly value: string;
	readonly onChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => void;
	readonly placeholder?: string;
	readonly required?: boolean;
	readonly rows?: number;
	readonly options?: Array<{ value: string; label: string }>;
	readonly error?: string;
	readonly className?: string;
}

export default function InputField({
	label,
	name,
	type = 'text',
	value,
	onChange,
	placeholder,
	required = false,
	rows = 4,
	options = [],
	error,
	className = '',
}: InputFieldProps) {
	const baseClassName = `input-field ${className}`;
	const inputClassName = error ? 'input-error' : '';

	const renderInput = () => {
		switch (type) {
			case 'textarea':
				return (
					<textarea
						id={name}
						name={name}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
						required={required}
						rows={rows}
						className={inputClassName}
					/>
				);
			case 'select':
				return (
					<select
						id={name}
						name={name}
						value={value}
						onChange={onChange}
						required={required}
						className={inputClassName}
					>
						<option value="">Select an option</option>
						{options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				);
			default:
				return (
					<input
						type={type}
						id={name}
						name={name}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
						required={required}
						className={inputClassName}
					/>
				);
		}
	};

	return (
		<div className={baseClassName}>
			<label htmlFor={name}>
				{label}
				{required && <span className="required-asterisk"> *</span>}
			</label>
			{renderInput()}
			{error && <span className="error-message">{error}</span>}
		</div>
	);
}
