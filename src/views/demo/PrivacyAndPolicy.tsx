import { useState, useEffect, useMemo } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import DataTable from '@/components/shared/DataTable'
import {
    apiGetPrivacyPolicies,
    apiCreatePrivacyPolicy,
    apiUpdatePrivacyPolicy,
    apiDeletePrivacyPolicy,
    PrivacyPolicy,
} from '@/services/PrivacyService'
import PrivacyEditDialog from './PrivacyEditDialog'
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from 'react-icons/hi'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Notification, toast } from '@/components/ui'
import type { ColumnDef } from '@/components/shared/DataTable'

const PrivacyAndPolicy = () => {
    const [data, setData] = useState<PrivacyPolicy[]>([])
    const [loading, setLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [editingData, setEditingData] = useState<PrivacyPolicy | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await apiGetPrivacyPolicies()
            if (response) {
                setData(response)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleCreate = () => {
        setEditingData(null)
        setIsDialogOpen(true)
    }

    const handleEdit = (row: PrivacyPolicy) => {
        setEditingData(row)
        setIsDialogOpen(true)
    }

    const handleDelete = (id: string) => {
        setDeletingId(id)
        setIsConfirmOpen(true)
    }

    const onConfirmDelete = async () => {
        if (deletingId) {
            try {
                await apiDeletePrivacyPolicy(deletingId)
                toast.push(
                    <Notification title="Success" type="success">
                        Policy deleted successfully
                    </Notification>
                )
                fetchData()
            } catch (error) {
                console.error(error)
            } finally {
                setIsConfirmOpen(false)
                setDeletingId(null)
            }
        }
    }

    const onDialogSubmit = async (formData: Omit<PrivacyPolicy, 'id'>) => {
        try {
            if (editingData) {
                await apiUpdatePrivacyPolicy({ ...formData, id: editingData.id })
                toast.push(
                    <Notification title="Success" type="success">
                        Policy updated successfully
                    </Notification>
                )
            } else {
                await apiCreatePrivacyPolicy(formData)
                toast.push(
                    <Notification title="Success" type="success">
                        Policy created successfully
                    </Notification>
                )
            }
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }

    const columns: ColumnDef<PrivacyPolicy>[] = useMemo(
        () => [
            {
                header: 'Title',
                accessorKey: 'title',
            },
            {
                header: 'Type',
                accessorKey: 'type',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="capitalize">
                            {row.type.replace(/_/g, ' ')}
                        </span>
                    )
                },
            },
            {
                header: 'Content',
                accessorKey: 'content',
                cell: (props) => {
                    const row = props.row.original
                    const plainText = row.content.replace(/<[^>]*>?/gm, '')
                    return (
                        <span className="truncate max-w-[400px] block">
                            {plainText}
                        </span>
                    )
                },
            },
            {
                header: 'Effective Date',
                accessorKey: 'effectiveDate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {new Date(row.effectiveDate).toLocaleDateString()}
                        </span>
                    )
                },
            },
            {
                header: () => <div className="text-center">Actions</div>,
                id: 'actions',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex justify-center text-lg">
                            <span
                                className="cursor-pointer p-2 hover:text-primary"
                                onClick={() => handleEdit(row)}
                            >
                                <HiOutlinePencil />
                            </span>
                            <span
                                className="cursor-pointer p-2 hover:text-red-500"
                                onClick={() => handleDelete(row.id)}
                            >
                                <HiOutlineTrash />
                            </span>
                        </div>
                    )
                },
            },
        ],
        []
    )

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="heading-text">Privacy and Policy</h3>
                    <Button
                        size="sm"
                        variant="solid"
                        icon={<HiPlus />}
                        onClick={handleCreate}
                        className="bg-warning hover:bg-warning-mild border-none text-neutral"
                    >
                        Add New
                    </Button>
                </div>
                <Card>
                    <DataTable
                        columns={columns}
                        data={data}
                        loading={loading}
                    />
                </Card>
            </div>

            <PrivacyEditDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={onDialogSubmit}
                editingData={editingData}
            />

            <ConfirmDialog
                isOpen={isConfirmOpen}
                type="danger"
                title="Delete Policy"
                confirmButtonProps={{ color: 'red-600' }}
                onClose={() => setIsConfirmOpen(false)}
                onCancel={() => setIsConfirmOpen(false)}
                onConfirm={onConfirmDelete}
            >
                <p>Are you sure you want to delete this privacy policy? This action cannot be undone.</p>
            </ConfirmDialog>
        </>
    )
}

export default PrivacyAndPolicy