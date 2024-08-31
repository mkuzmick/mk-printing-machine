import { ReactNode } from 'react';

interface TaskProps {
    children: ReactNode;
}
const Task = ({children}: TaskProps) => {
    return (
        <div>
            {children}
        </div>
    );
}

export default function Page({ params }: { params: { view: string } }) {
    return (
        <main>
            <div>printable tasks for Airtable View: {params.view}</div>
            <Task>
                Task content
            </Task>
        </main>
    )
}

export default function Page() {
    return 
  }