import { ReactNode } from 'react';

interface TaskProps {
    title: string;
    assignedToSlug: string[];
    notes: string;
    temporalStatus: string;
    createdTime: string;
}

const Task = ({ title, assignedToSlug, notes, temporalStatus, createdTime }: TaskProps) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 max-w-md mx-auto print:max-w-[2.5in] print:shadow-none print:mb-2 print:bg-transparent print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-sm text-gray-700 mb-1">
                <strong>Assigned To:</strong> {assignedToSlug.join(', ')}
            </p>
            <p className="text-sm text-gray-700 mb-1">
                <strong>Notes:</strong> {notes}
            </p>
            <p className="text-sm text-gray-700 mb-1">
                <strong>Status:</strong> {temporalStatus}
            </p>
            <p className="text-sm text-gray-500">
                <strong>Created Time:</strong> {new Date(createdTime).toLocaleString()}
            </p>
        </div>
    );
}

export default async function Page({ params }: { params: { view: string } }) {
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_WORK_BASE}/Tasks?view=${params.view}&maxRecords=1000`;
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${process.env.AIRTABLE_API_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);

        return (
            <main>
                <div>Printable tasks for Airtable View: {params.view}</div>
                {data.records.map((record: any) => (
                    <Task
                        key={record.id}
                        title={record.fields.Title || 'Untitled Task'}
                        assignedToSlug={record.fields.AssignedTo_Slug || []}
                        notes={record.fields.Notes || 'No notes provided'}
                        temporalStatus={record.fields.TemporalStatus || 'No status'}
                        createdTime={record.fields.CreatedTime || record.createdTime}
                    />
                ))}
            </main>
        );

    } catch (error) {
        console.error("Error fetching tasks:", error);
        return (
            <div>Error—sorry!</div>
        );
    }
}
