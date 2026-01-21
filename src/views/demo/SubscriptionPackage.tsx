import { useState, useEffect, useMemo } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import DataTable from '@/components/shared/DataTable'
import {
    apiGetSubscriptionPackages,
    apiCreateSubscriptionPackage,
    apiUpdateSubscriptionPackage,
    apiDeleteSubscriptionPackage,
    SubscriptionPackage,
} from '@/services/SubscriptionService'
import SubscriptionEditDialog from './SubscriptionEditDialog'
import SubscriptionViewDialog from './SubscriptionViewDialog'
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiOutlineEye } from 'react-icons/hi'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Notification, toast } from '@/components/ui'
import Badge from '@/components/ui/Badge'
import type { ColumnDef } from '@/components/shared/DataTable'

const SubscriptionPackageView = () => {
    const [data, setData] = useState<SubscriptionPackage[]>([])
    const [loading, setLoading] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [selectedData, setSelectedData] = useState<SubscriptionPackage | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await apiGetSubscriptionPackages()
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

    const handleEdit = (row: SubscriptionPackage) => {
        setSelectedData(row)
        setIsEditOpen(true)
    }

    const handleView = (row: SubscriptionPackage) => {
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
                await apiDeleteSubscriptionPackage(deletingId)
                toast.push(
                    <Notification title="Success" type="success">
                        Package deleted successfully
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

    const onFormSubmit = async (formData: Omit<SubscriptionPackage, 'id'>) => {
        try {
            if (selectedData) {
                await apiUpdateSubscriptionPackage({ ...formData, id: selectedData.id })
                toast.push(
                    <Notification title="Success" type="success">
                        Package updated successfully
                    </Notification>
                )
            } else {
                await apiCreateSubscriptionPackage(formData)
                toast.push(
                    <Notification title="Success" type="success">
                        Package created successfully
                    </Notification>
                )
            }
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }

    const columns: ColumnDef<SubscriptionPackage>[] = useMemo(
        () => [
            {
                header: 'Package',
                accessorKey: 'packageName',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <img src={row.iconURL} alt={row.packageName} className="w-8 h-8 object-contain" />
                            <span className="font-bold">{row.packageName}</span>
                        </div>
                    )
                }
            },
            {
                header: 'Price',
                accessorKey: 'price',
                cell: (props) => {
                    const row = props.row.original
                    return <span>${row.price} / {row.priceUnit}</span>
                }
            },
            {
                header: 'Storage',
                accessorKey: 'storageAmount',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.storageAmount} {row.storageUnit}</span>
                }
            },
            {
                header: () => (
                    <div className="flex justify-center font-bold uppercase">
                        Status
                    </div>
                ),
                accessorKey: 'isActive',
                enableSorting: false,
                cell: (props) => {
                    const isActive = props.row.original.isActive
                    return (
                        <div className="flex justify-center">
                            <Badge
                                content={isActive ? 'Active' : 'Inactive'}
                                innerClass={isActive ? 'bg-emerald-500' : 'bg-red-500'}
                            />
                        </div>
                    )
                },
            },
            {
                header: () => (
                    <div className="flex justify-center font-bold uppercase">
                        Actions
                    </div>
                ),
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
                    <h3 className="heading-text">Subscription Packages</h3>
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

            <SubscriptionEditDialog
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSubmit={onFormSubmit}
                editingData={selectedData}
            />

            <SubscriptionViewDialog
                isOpen={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                data={selectedData}
            />

            <ConfirmDialog
                isOpen={isConfirmOpen}
                type="danger"
                title="Delete Package"
                confirmButtonProps={{ color: 'red-600' }}
                onClose={() => setIsConfirmOpen(false)}
                onCancel={() => setIsConfirmOpen(false)}
                onConfirm={onConfirmDelete}
            >
                <p>Are you sure you want to delete this subscription package? This action cannot be undone.</p>
            </ConfirmDialog>
        </>
    )
}

export default SubscriptionPackageView
