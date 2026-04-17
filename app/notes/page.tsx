import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

import css from './NotesPage.module.css';

import {fetchNotes} from "@/lib/api";
import NotesClient from "@/app/notes/Notes.client";

export default async function Notes() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", "", 1, 12],
        queryFn: () => fetchNotes("", 1, 12),
    })

    return (
        <div className={css.app}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotesClient/>
            </HydrationBoundary>
        </div>
    )
}
