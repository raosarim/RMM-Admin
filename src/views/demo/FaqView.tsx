import { useState, useEffect, useMemo } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import DataTable from '@/components/shared/DataTable'
import {
    apiGetFaqs,
    apiCreateFaq,
    apiUpdateFaq,
    apiDeleteFaq,
    apiGetFaqCategories,
} from '@/services/FaqService'
import type { Faq, FaqCategory } from '@/services/FaqService'
import FaqEditDialog from './FaqEditDialog'
import FaqViewDialog from './FaqViewDialog'
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiOutlineEye } from 'react-icons/hi'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Notification, toast } from '@/components/ui'
import type { ColumnDef } from '@/components/shared/DataTable'

const FaqView = () => {
    const [data, setData] = useState<Faq[]>([])
    const [categories, setCategories] = useState<FaqCategory[]>([])
    const [loading, setLoading] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [selectedData, setSelectedData] = useState<Faq | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const fetchData = async () => {
        setLoading(true)
        try {
            const [faqs, cats] = await Promise.all([
                apiGetFaqs(),
                apiGetFaqCategories()
            ])
            if (faqs) setData(faqs)
            if (cats) setCategories(cats)
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
        setSelectedData(null)
        setIsEditOpen(true)
    }

    const handleEdit = (row: Faq) => {
        setSelectedData(row)
        setIsEditOpen(true)
    }

    const handleView = (row: Faq) => {
        setSelectedData(row)
        setIsViewOpen(true)
    }

    const handleDelete = (id: string) => {
        setDeletingId(id)
        setIsConfirmOpen(true)
    }

    const onConfirmDelete = async () => {
        if (deletingId) {
            try {
                await apiDeleteFaq(deletingId)
                toast.push(
                    <Notification title="Success" type="success">
                        FAQ deleted successfully
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

    const onFormSubmit = async (formData: Omit<Faq, 'id'>) => {
        try {
            if (selectedData) {
                await apiUpdateFaq({ ...formData, id: selectedData.id })
                toast.push(
                    <Notification title="Success" type="success">
                        FAQ updated successfully
                    </Notification>
                )
            } else {
                await apiCreateFaq(formData)
                toast.push(
                    <Notification title="Success" type="success">
                        FAQ created successfully
                    </Notification>
                )
            }
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }

    const columns: ColumnDef<Faq>[] = useMemo(
        () => [
            {
                header: 'Category',
                accessorKey: 'categoryId',
                cell: (props) => {
                    const row = props.row.original
                    const category = categories.find((cat) => cat.id === row.categoryId)
                    return <span>{category?.title || 'Unknown'}</span>
                }
            },
            {
                header: 'Question',
                accessorKey: 'question',
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
                                onClick={() => handleView(row)}
                            >
                                <HiOutlineEye />
                            </span>
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
        [categories]
    )

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="heading-text">FAQ Management</h3>
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

            <FaqEditDialog
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSubmit={onFormSubmit}
                editingData={selectedData}
            />

            <FaqViewDialog
                isOpen={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                data={selectedData}
            />

            <ConfirmDialog
                isOpen={isConfirmOpen}
                type="danger"
                title="Delete FAQ"
                confirmButtonProps={{ color: 'red-600' }}
                onClose={() => setIsConfirmOpen(false)}
                onCancel={() => setIsConfirmOpen(false)}
                onConfirm={onConfirmDelete}
            >
                <p>Are you sure you want to delete this FAQ? This action cannot be undone.</p>
            </ConfirmDialog>
        </>
    )
}

export default FaqView