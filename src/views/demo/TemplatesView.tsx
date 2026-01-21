import { useState, useEffect, useMemo } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import DataTable from '@/components/shared/DataTable'
import {
    apiGetTemplates,
    apiCreateTemplate,
    apiUpdateTemplate,
    apiDeleteTemplate,
    Template,
} from '@/services/TemplateService'
import { apiGetLandingModes, LandingMode } from '@/services/LandingModeService'
import TemplateEditDialog from './TemplateEditDialog'
import TemplateViewDialog from './TemplateViewDialog'
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiOutlineEye } from 'react-icons/hi'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Notification, toast } from '@/components/ui'
import type { ColumnDef } from '@/components/shared/DataTable'

const TemplatesView = () => {
    const [data, setData] = useState<Template[]>([])
    const [landingModes, setLandingModes] = useState<LandingMode[]>([])
    const [loading, setLoading] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [selectedData, setSelectedData] = useState<Template | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const fetchData = async () => {
        setLoading(true)
        try {
            const [templateRes, landingModeRes] = await Promise.all([
                apiGetTemplates(),
                apiGetLandingModes()
            ])
            if (templateRes) setData(templateRes)
            if (landingModeRes) setLandingModes(landingModeRes)
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

    const handleEdit = (row: Template) => {
        setSelectedData(row)
        setIsEditOpen(true)
    }

    const handleView = (row: Template) => {
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
                await apiDeleteTemplate(deletingId)
                toast.push(
                    <Notification title="Success" type="success">
                        Template deleted successfully
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

    const onFormSubmit = async (formData: Omit<Template, 'id'>) => {
        try {
            if (selectedData) {
                await apiUpdateTemplate({ ...formData, id: selectedData.id })
                toast.push(
                    <Notification title="Success" type="success">
                        Template updated successfully
                    </Notification>
                )
            } else {
                await apiCreateTemplate(formData)
                toast.push(
                    <Notification title="Success" type="success">
                        Template created successfully
                    </Notification>
                )
            }
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }

    const columns: ColumnDef<Template>[] = useMemo(
        () => [
            {
                header: 'Template Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center gap-3">
                            <img src={row.thumbnailURL} alt={row.name} className="w-12 h-12 rounded object-cover border" />
                            <span className="font-bold">{row.name}</span>
                        </div>
                    )
                }
            },
            {
                header: 'Landing Mode',
                accessorKey: 'landingModeId',
                cell: (props) => {
                    const modeId = props.row.original.landingModeId
                    const mode = landingModes.find(m => m.id === modeId)
                    return <span>{mode?.title || 'Unknown'}</span>
                }
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
        [landingModes]
    )

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="heading-text">Templates</h3>
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

            <TemplateEditDialog
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSubmit={onFormSubmit}
                editingData={selectedData}
            />

            <TemplateViewDialog
                isOpen={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                data={selectedData}
            />

            <ConfirmDialog
                isOpen={isConfirmOpen}
                type="danger"
                title="Delete Template"
                confirmButtonProps={{ color: 'red-600' }}
                onClose={() => setIsConfirmOpen(false)}
                onCancel={() => setIsConfirmOpen(false)}
                onConfirm={onConfirmDelete}
            >
                <p>Are you sure you want to delete this template? This action cannot be undone.</p>
            </ConfirmDialog>
        </>
    )
}

export default TemplatesView