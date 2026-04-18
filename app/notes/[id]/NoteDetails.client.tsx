'use client'

import NoteDetails from "@/components/NoteDetails/NoteDetails";
import {useQuery} from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import {fetchNoteById} from "@/lib/api";


export default function NoteDetailsClient(){
    const {id} = useParams<{id: string}>();

    const {data: note, isLoading, error} = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error || !note) return <p>Something went wrong.</p>;

    const formattedDate = note.updatedAt
        ? `Updated at: ${note.updatedAt}`
        : `Created at: ${note.createdAt}`;

    return (
        <div>
            <NoteDetails note={note} />
            <p>{formattedDate}</p>
        </div>
    )
}