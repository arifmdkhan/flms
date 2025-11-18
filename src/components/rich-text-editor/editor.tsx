'use client'


import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Menubar } from './menubar'
import React from 'react'
import TextAlign from '@tiptap/extension-text-align'
export function RichTextEditor({ field }: { field: any }) {
    const [version, setVersion] = React.useState(0)

    const editor = useEditor({
        extensions: [StarterKit, TextAlign.configure({
            types: ['heading', 'paragraph'],
        })],
        editorProps: {
            attributes: {
                class: 'min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none'
            }
        },
        onUpdate: ({editor})=>{
            field.onChange(JSON.stringify(editor.getJSON()))
        },
        content: field.value ? JSON.parse(field.value): '<p>Hello</p>',
       
        immediatelyRender: false,
    })

    React.useEffect(() => {
        if (!editor) return

        const refresh = () => setVersion(x => x + 1)

        editor.on('selectionUpdate', refresh)
        editor.on('transaction', refresh)
        editor.on('update', refresh)

        return () => {
            editor.off('selectionUpdate', refresh)
            editor.off('transaction', refresh)
            editor.off('update', refresh)
        }
    }, [editor])

    return (
        <div className='w-full border border-input rounded-lg overflow-hidden dark:bg-input/30'>
            <Menubar key={version} editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

