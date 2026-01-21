import { useEffect, useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Upload from '@/components/ui/Upload'
import Select from '@/components/ui/Select'
import { useForm, Controller } from 'react-hook-form'
import { Template } from '@/services/TemplateService'
import { apiGetLandingModes, LandingMode } from '@/services/LandingModeService'
import { HiOutlineCloudUpload } from 'react-icons/hi'

type TemplateEditDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Omit<Template, 'id'>) => void
    editingData?: Template | null
}

const TemplateEditDialog = ({
    isOpen,
    onClose,
    onSubmit,
    editingData,
}: TemplateEditDialogProps) => {
    const [landingModes, setLandingModes] = useState<LandingMode[]>([])

    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            landingModeId: '',
            thumbnailURL: '',
        },
    })

    const thumbnailURL = watch('thumbnailURL')

    useEffect(() => {
        const fetchLandingModes = async () => {
            const response = await apiGetLandingModes()
            if (response) {
                setLandingModes(response)
            }
        }
        fetchLandingModes()
    }, [])

    useEffect(() => {
        if (editingData) {
            reset(editingData)
        } else {
            reset({
                name: '',
                landingModeId: '',
                thumbnailURL: '',
            })
        }
    }, [editingData, reset, isOpen])

    const onFormSubmit = (data: Omit<Template, 'id'>) => {
        onSubmit(data)
        onClose()
    }

    const onUpload = (files: File[]) => {
        if (files.length > 0) {
            const file = files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setValue('thumbnailURL', result)
            }
            reader.readAsDataURL(file)
        }
    }

    const landingModeOptions = landingModes.map((lm) => ({
        label: lm.title,
        value: lm.id,
    }))

    return (
        <Dialog
            isOpen={isOpen}
            width={600}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <h5 className="mb-4">
                {editingData ? 'Edit Template' : 'Add Template'}
            </h5>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <FormContainer>
                    <div className="max-h-[70vh] overflow-y-auto px-1">
                        <FormItem
                            label="Template Name"
                            invalid={Boolean(errors.name)}
                            errorMessage={errors.name?.message}
                        >
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Enter template name" />
                                )}
                            />
                        </FormItem>

                        <FormItem
                            label="Landing Mode"
                            invalid={Boolean(errors.landingModeId)}
                            errorMessage={errors.landingModeId?.message}
                        >
                            <Controller
                                name="landingModeId"
                                control={control}
                                rules={{ required: 'Landing mode is required' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={landingModeOptions}
                                        value={landingModeOptions.find(
                                            (option) => option.value === field.value
                                        )}
                                        onChange={(option) => field.onChange(option?.value)}
                                        placeholder="Select Landing Mode"
                                    />
                                )}
                            />
                        </FormItem>

                        <FormItem
                            label="Thumbnail"
                            invalid={Boolean(errors.thumbnailURL)}
                            errorMessage={errors.thumbnailURL?.message}
                        >
                            <Controller
                                name="thumbnailURL"
                                control={control}
                                rules={{ required: 'Thumbnail is required' }}
                                render={() => (
                                    <div className="flex flex-col gap-4">
                                        <Upload
                                            draggable
                                            className="min-h-[150px]"
                                            onChange={onUpload}
                                            showList={false}
                                            uploadLimit={1}
                                            accept="image/*"
                                        >
                                            <div className="flex flex-col items-center justify-center text-center">
                                                <HiOutlineCloudUpload className="text-4xl mb-1 text-warning" />
                                                <p className="text-sm font-semibold">
                                                    <span className="text-warning text-yellow-500">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
                                            </div>
                                        </Upload>
                                        {thumbnailURL && (
                                            <div className="mt-2 text-center">
                                                <div className="relative inline-block border rounded-lg p-1 bg-gray-50 dark:bg-gray-700">
                                                    <img
                                                        src={thumbnailURL}
                                                        alt="Thumbnail Preview"
                                                        className="max-w-full h-32 object-contain rounded"
                                                    />
                                                    <Button
                                                        size="xs"
                                                        type="button"
                                                        className="absolute top-2 right-2"
                                                        onClick={() => setValue('thumbnailURL', '')}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                        </FormItem>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <Button type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="solid" type="submit" className="bg-warning hover:bg-warning-mild border-none text-neutral">
                            {editingData ? 'Update' : 'Save'}
                        </Button>
                    </div>
                </FormContainer>
            </form>
        </Dialog>
    )
}

export default TemplateEditDialog
