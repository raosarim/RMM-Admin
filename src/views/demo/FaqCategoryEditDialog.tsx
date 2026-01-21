import { useEffect } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Upload from '@/components/ui/Upload'
import { useForm, Controller } from 'react-hook-form'
import { FaqCategory } from '@/services/FaqService'
import { HiOutlineCloudUpload } from 'react-icons/hi'

type FaqCategoryEditDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Omit<FaqCategory, 'id'>) => void
    editingData?: FaqCategory | null
}

const FaqCategoryEditDialog = ({
    isOpen,
    onClose,
    onSubmit,
    editingData,
}: FaqCategoryEditDialogProps) => {
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
            iconURL: '',
        },
    })

    const iconURL = watch('iconURL')

    useEffect(() => {
        if (editingData) {
            reset(editingData)
        } else {
            reset({
                title: '',
                iconURL: '',
            })
        }
    }, [editingData, reset, isOpen])

    const onFormSubmit = (data: Omit<FaqCategory, 'id'>) => {
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
            width={600}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <h5 className="mb-4">
                {editingData ? 'Edit FAQ Category' : 'Add FAQ Category'}
            </h5>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <FormContainer>
                    <div className="max-h-[60vh] overflow-y-auto px-1">
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
                                    <Input {...field} placeholder="Enter category title" />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            label="Category Icon"
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
                                            className="min-h-[150px]"
                                            onChange={onUpload}
                                            showList={false}
                                            uploadLimit={1}
                                            accept="image/*"
                                        >
                                            <div className="flex flex-col items-center justify-center text-center">
                                                <HiOutlineCloudUpload className="text-4xl mb-2 text-warning" />
                                                <p className="font-semibold">
                                                    <span className="text-warning text-yellow-500">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs">SVG, PNG, JPG or GIF</p>
                                            </div>
                                        </Upload>
                                        {iconURL && (
                                            <div className="flex items-center gap-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700">
                                                <img
                                                    src={iconURL}
                                                    alt="Preview"
                                                    className="w-12 h-12 object-contain bg-white rounded p-1"
                                                />
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="text-sm font-medium truncate">Current Icon</p>
                                                    <p className="text-xs text-gray-500 truncate">Uploaded successfully</p>
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

                    <div className="flex justify-end gap-2 mt-4">
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

export default FaqCategoryEditDialog
