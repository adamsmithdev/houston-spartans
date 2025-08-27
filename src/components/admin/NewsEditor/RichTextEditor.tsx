'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { useCallback } from 'react';
import { LoadingSpinner } from '@/components/ui';
import styles from './RichTextEditor.module.css';

interface RichTextEditorProps {
	readonly content: string;
	readonly onChange: (content: string) => void;
}

interface ToolbarButtonProps {
	readonly onClick: () => void;
	readonly isActive?: boolean;
	readonly disabled?: boolean;
	readonly children: React.ReactNode;
	readonly title?: string;
}

function ToolbarButton({
	onClick,
	isActive,
	disabled,
	children,
	title,
}: ToolbarButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			title={title}
			className={`${styles.toolbarButton} ${isActive ? styles.active : ''}`}
		>
			{children}
		</button>
	);
}

export default function RichTextEditor({
	content,
	onChange,
}: RichTextEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false,
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false,
				},
			}),
			Image.configure({
				HTMLAttributes: {
					class: 'editor-image',
				},
			}),
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: 'editor-link',
				},
			}),
			Underline,
			TextStyle,
			Color,
			Highlight.configure({
				multicolor: true,
			}),
		],
		content,
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: styles.editor,
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	const addImage = useCallback(async () => {
		if (!editor) return;

		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';

		input.onchange = async (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (!file) return;

			try {
				const formData = new FormData();
				formData.append('file', file);
				formData.append('folder', 'content');

				const response = await fetch('/api/admin/news/upload', {
					method: 'POST',
					body: formData,
				});

				if (!response.ok) {
					throw new Error('Failed to upload image');
				}

				const { url } = await response.json();
				editor.chain().focus().setImage({ src: url }).run();
			} catch (error) {
				alert(
					'Failed to upload image: ' +
						(error instanceof Error ? error.message : 'Unknown error'),
				);
			}
		};

		input.click();
	}, [editor]);

	const addLink = useCallback(() => {
		if (!editor) return;

		const previousUrl = editor.getAttributes('link').href;
		const url = window.prompt('URL', previousUrl);

		if (url === null) {
			return;
		}

		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();
			return;
		}

		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	}, [editor]);

	if (!editor) {
		return <LoadingSpinner message="Loading editor..." size="small" />;
	}

	return (
		<div className={styles.richTextEditor}>
			{/* Toolbar */}
			<div className={styles.toolbar}>
				{/* Text Formatting */}
				<div className={styles.toolbarGroup}>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleBold().run()}
						isActive={editor.isActive('bold')}
						title="Bold"
					>
						<strong>B</strong>
					</ToolbarButton>

					<ToolbarButton
						onClick={() => editor.chain().focus().toggleItalic().run()}
						isActive={editor.isActive('italic')}
						title="Italic"
					>
						<em>I</em>
					</ToolbarButton>

					<ToolbarButton
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						isActive={editor.isActive('underline')}
						title="Underline"
					>
						<u>U</u>
					</ToolbarButton>

					<ToolbarButton
						onClick={() => editor.chain().focus().toggleStrike().run()}
						isActive={editor.isActive('strike')}
						title="Strikethrough"
					>
						<s>S</s>
					</ToolbarButton>
				</div>

				{/* Headings */}
				<div className={styles.toolbarGroup}>
					<ToolbarButton
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 1 }).run()
						}
						isActive={editor.isActive('heading', { level: 1 })}
						title="Heading 1"
					>
						H1
					</ToolbarButton>

					<ToolbarButton
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
						isActive={editor.isActive('heading', { level: 2 })}
						title="Heading 2"
					>
						H2
					</ToolbarButton>

					<ToolbarButton
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 3 }).run()
						}
						isActive={editor.isActive('heading', { level: 3 })}
						title="Heading 3"
					>
						H3
					</ToolbarButton>

					<ToolbarButton
						onClick={() => editor.chain().focus().setParagraph().run()}
						isActive={editor.isActive('paragraph')}
						title="Paragraph"
					>
						P
					</ToolbarButton>
				</div>

				{/* Lists */}
				<div className={styles.toolbarGroup}>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						isActive={editor.isActive('bulletList')}
						title="Bullet List"
					>
						• List
					</ToolbarButton>

					<ToolbarButton
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						isActive={editor.isActive('orderedList')}
						title="Numbered List"
					>
						1. List
					</ToolbarButton>

					<ToolbarButton
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
						isActive={editor.isActive('blockquote')}
						title="Quote"
					>
						&quot; Quote
					</ToolbarButton>
				</div>

				{/* Media & Links */}
				<div className={styles.toolbarGroup}>
					<ToolbarButton
						onClick={addLink}
						isActive={editor.isActive('link')}
						title="Add Link"
					>
						🔗 Link
					</ToolbarButton>

					<ToolbarButton onClick={addImage} title="Add Image">
						🖼️ Image
					</ToolbarButton>
				</div>

				{/* Actions */}
				<div className={styles.toolbarGroup}>
					<ToolbarButton
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().chain().focus().undo().run()}
						title="Undo"
					>
						↶ Undo
					</ToolbarButton>

					<ToolbarButton
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().chain().focus().redo().run()}
						title="Redo"
					>
						↷ Redo
					</ToolbarButton>
				</div>
			</div>

			{/* Editor Content */}
			<div className={styles.editorWrapper}>
				<EditorContent editor={editor} />
			</div>
		</div>
	);
}
