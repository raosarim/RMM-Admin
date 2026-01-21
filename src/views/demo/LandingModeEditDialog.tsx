import { useEffect } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Upload from '@/components/ui/Upload'
import Switcher from '@/components/ui/Switcher'
import Select from '@/components/ui/Select'
import { useForm, Controller } from 'react-hook-form'
import { LandingMode } from '@/services/LandingModeService'
import { HiOutlineCloudUpload } from 'react-icons/hi'

type LandingModeEditDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Omit<LandingMode, 'id'>) => void
    editingData?: LandingMode | null
}

const landingModeOptions = [
    { label: 'Full Mode', value: 'full-mode' },
    { label: 'Event Mode', value: 'event-mode' },
    { label: 'Video Only Mode', value: 'video-only-mode' },
]

const LandingModeEditDialog = ({
    isOpen,
    onClose,
    onSubmit,
    editingData,
}: LandingModeEditDialogProps) => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            landingModeType: 'full-mode',
            iconURL: '',
            isActive: true,
        },
    })

    const iconURL = watch('iconURL')

    useEffect(() => {
        if (editingData) {
            reset(editingData)
        } else {
            reset({
                title: '',
                description: '',
                landingModeType: 'full-mode',
                iconURL: '',
                isActive: true,
            })
        }
    }, [editingData, reset, isOpen])

    const onFormSubmit = (data: Omit<LandingMode, 'id'>) => {
        onSubmit(data)
        onClose()
    }

    const onUpload = (files: File[]) => {
        if (files.length > 0) {
            const file = files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setValue('iconURL', result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Dialog
            isOpen={isOpen}
            width={700}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <h5 className="mb-4">
                {editingData ? 'Edit Landing Mode' : 'Add Landing Mode'}
            </h5>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <FormContainer>
                    <div className="max-h-[70vh] overflow-y-auto px-1">
                        <FormItem
                            label="Title"
                            invalid={Boolean(errors.title)}
                            errorMessage={errors.title?.message}
                        >
                            <Controller
                                name="title"
                                control={control}
                                rules={{ required: 'Title is required' }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Enter title (e.g. Video Only Mode)" />
                                )}
                            />
                        </FormItem>

                        <FormItem
                            label="Description"
                            invalid={Boolean(errors.description)}
                            errorMessage={errors.description?.message}
                        >
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: 'Description is required' }}
                                render={({ field }) => (
                                    <Input
                                        textArea
                                        {...field}
                                        placeholder="Enter description"
                                    />
                                )}
                            />
                        </FormItem>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormItem
                                label="Landing Mode Type"
                                invalid={Boolean(errors.landingModeType)}
                                errorMessage={errors.landingModeType?.message}
                            >
                                <Controller
                                    name="landingModeType"
                                    control={control}
                                    rules={{ required: 'Type is required' }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={landingModeOptions}
                                            value={landingModeOptions.find(
                                                (option) => option.value === field.value
                                            )}
                                            onChange={(option) => field.onChange(option?.value)}
                                            placeholder="Select Landing Mode Type"
                                        />
                                    )}
                                />
                            </FormItem>

                            <FormItem label="Status">
                                <Controller
                                    name="isActive"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex items-center gap-2 mt-2">
                                            <Switcher
                                                checked={field.value}
                                                onChange={(val) => field.onChange(val)}
                                            />
                                            <span className="text-sm font-semibold">
                                                {field.value ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    )}
                                />
                            </FormItem>
                        </div>

                        <FormItem
                            label="Icon"
                            invalid={Boolean(errors.iconURL)}
                            errorMessage={errors.iconURL?.message}
                        >
                            <Controller
                                name="iconURL"
                                control={control}
                                rules={{ required: 'Icon is required' }}
                                render={() => (
                                    <div className="flex flex-col gap-4">
                                        <Upload
                                            draggable
                                            className="min-h-[120px]"
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
                                        {iconURL && (
                                            <div className="flex items-center gap-4 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700">
                                                <img
                                                    src={iconURL}
                                                    alt="Preview"
                                                    className="w-12 h-12 object-contain bg-white rounded p-1"
                                                />
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="text-xs font-medium truncate">Selected Icon</p>
                                                </div>
                                                <Button
                                                    size="xs"
                                                    type="button"
                                                    onClick={() => setValue('iconURL', '')}
                                                >
                                                    Remove
                                                </Button>
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

export default LandingModeEditDialog
