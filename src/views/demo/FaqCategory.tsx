import { useState, useEffect, useMemo } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import DataTable from '@/components/shared/DataTable'
import {
    apiGetFaqCategories,
    apiCreateFaqCategory,
    apiUpdateFaqCategory,
    apiDeleteFaqCategory,
} from '@/services/FaqService'
import type { FaqCategory } from '@/services/FaqService'
import FaqCategoryEditDialog from './FaqCategoryEditDialog'
import FaqCategoryViewDialog from './FaqCategoryViewDialog'
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiOutlineEye } from 'react-icons/hi'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Notification, toast } from '@/components/ui'
import type { ColumnDef } from '@/components/shared/DataTable'

const FaqCategory = () => {
    const [data, setData] = useState<FaqCategory[]>([])
    const [loading, setLoading] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [selectedData, setSelectedData] = useState<FaqCategory | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await apiGetFaqCategories()
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
        setSelectedData(null)
        setIsEditOpen(true)
    }

    const handleEdit = (row: FaqCategory) => {
        setSelectedData(row)
        setIsEditOpen(true)
    }

    const handleView = (row: FaqCategory) => {
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
                await apiDeleteFaqCategory(deletingId)
                toast.push(
                    <Notification title="Success" type="success">
                        Category deleted successfully
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

    const onFormSubmit = async (formData: Omit<FaqCategory, 'id'>) => {
        try {
            if (selectedData) {
                await apiUpdateFaqCategory({ ...formData, id: selectedData.id })
                toast.push(
                    <Notification title="Success" type="success">
                        Category updated successfully
                    </Notification>
                )
            } else {
                await apiCreateFaqCategory(formData)
                toast.push(
                    <Notification title="Success" type="success">
                        Category created successfully
                    </Notification>
                )
            }
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }

    const columns: ColumnDef<FaqCategory>[] = useMemo(
        () => [
            {
                header: 'Icon',
                accessorKey: 'iconURL',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <img src={row.iconURL} alt={row.title} className="w-8 h-8 object-contain" />
                        </div>
                    )
                }
            },
            {
                header: 'Title',
                accessorKey: 'title',
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
        []
    )

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="heading-text">FAQ Categories</h3>
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

            <FaqCategoryEditDialog
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSubmit={onFormSubmit}
                editingData={selectedData}
            />

            <FaqCategoryViewDialog
                isOpen={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                data={selectedData}
            />

            <ConfirmDialog
                isOpen={isConfirmOpen}
                type="danger"
                title="Delete Category"
                confirmButtonProps={{ color: 'red-600' }}
                onClose={() => setIsConfirmOpen(false)}
                onCancel={() => setIsConfirmOpen(false)}
                onConfirm={onConfirmDelete}
            >
                <p>Are you sure you want to delete this category? This action cannot be undone.</p>
            </ConfirmDialog>
        </>
    )
}

export default FaqCategory
