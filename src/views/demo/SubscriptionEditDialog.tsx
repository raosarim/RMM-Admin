import { useEffect } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Upload from '@/components/ui/Upload'
import Switcher from '@/components/ui/Switcher'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { SubscriptionPackage } from '@/services/SubscriptionService'
import { HiOutlineCloudUpload, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi'

import Select from '@/components/ui/Select'

type SubscriptionEditDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Omit<SubscriptionPackage, 'id'>) => void
    editingData?: SubscriptionPackage | null
}

const priceUnitOptions = [
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
]

const storageUnitOptions = [
    { label: 'GB', value: 'GB' },
    { label: 'TB', value: 'TB' },
]

const SubscriptionEditDialog = ({
    isOpen,
    onClose,
    onSubmit,
    editingData,
}: SubscriptionEditDialogProps) => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            packageName: '',
            iconURL: '',
            price: 0,
            priceUnit: 'month',
            storageAmount: 0,
            storageUnit: 'GB',
            features: [{ value: '' }],
            isActive: true,
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'features',
    })

    const iconURL = watch('iconURL')

    useEffect(() => {
        if (editingData) {
            const formattedData = {
                ...editingData,
                features: editingData.features.map(f => ({ value: f }))
            }
            if (formattedData.features.length === 0) {
                formattedData.features = [{ value: '' }]
            }
            reset(formattedData)
        } else {
            reset({
                packageName: '',
                iconURL: '',
                price: 0,
                priceUnit: 'month',
                storageAmount: 0,
                storageUnit: 'GB',
                features: [{ value: '' }],
                isActive: true,
            })
        }
    }, [editingData, reset, isOpen])

    const onFormSubmit = (data: any) => {
        const formattedData = {
            ...data,
            features: data.features
                .map((f: { value: string }) => f.value)
                .filter((f: string) => f.trim() !== ''),
            price: Number(data.price),
            storageAmount: Number(data.storageAmount),
        }
        onSubmit(formattedData)
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
            width={800}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <h5 className="mb-4">
                {editingData ? 'Edit Subscription Package' : 'Add Subscription Package'}
            </h5>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <FormContainer>
                    <div className="max-h-[70vh] overflow-y-auto px-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormItem
                                label="Package Name"
                                invalid={Boolean(errors.packageName)}
                                errorMessage={errors.packageName?.message}
                            >
                                <Controller
                                    name="packageName"
                                    control={control}
                                    rules={{ required: 'Package name is required' }}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Enter package name" />
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

                            <FormItem
                                label="Price"
                                invalid={Boolean(errors.price)}
                                errorMessage={errors.price?.message}
                            >
                                <Controller
                                    name="price"
                                    control={control}
                                    rules={{ required: 'Price is required', min: 1 }}
                                    render={({ field }) => (
                                        <Input {...field} type="number" placeholder="Enter price" />
                                    )}
                                />
                            </FormItem>

                            <FormItem label="Price Unit">
                                <Controller
                                    name="priceUnit"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={priceUnitOptions}
                                            value={priceUnitOptions.find(
                                                (option) => option.value === field.value
                                            )}
                                            onChange={(option) => field.onChange(option?.value)}
                                            placeholder="Select Price Unit"
                                        />
                                    )}
                                />
                            </FormItem>

                            <FormItem
                                label="Storage Amount"
                                invalid={Boolean(errors.storageAmount)}
                                errorMessage={errors.storageAmount?.message}
                            >
                                <Controller
                                    name="storageAmount"
                                    control={control}
                                    rules={{ required: 'Storage amount is required', min: 1 }}
                                    render={({ field }) => (
                                        <Input {...field} type="number" placeholder="Enter storage amount" />
                                    )}
                                />
                            </FormItem>

                            <FormItem label="Storage Unit">
                                <Controller
                                    name="storageUnit"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={storageUnitOptions}
                                            value={storageUnitOptions.find(
                                                (option) => option.value === field.value
                                            )}
                                            onChange={(option) => field.onChange(option?.value)}
                                            placeholder="Select Storage Unit"
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>

                        <FormItem label="Package Icon">
                            <Controller
                                name="iconURL"
                                control={control}
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
                                                <p className="text-xs">SVG, PNG, JPG or GIF</p>
                                            </div>
                                        </Upload>
                                        {iconURL && (
                                            <div className="flex items-center gap-4 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700">
                                                <img
                                                    src={iconURL}
                                                    alt="Preview"
                                                    className="w-10 h-10 object-contain bg-white rounded p-1"
                                                />
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="text-xs font-medium truncate">Package Icon</p>
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

                        <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <h6 className="text-sm">Features</h6>
                                <Button
                                    size="xs"
                                    type="button"
                                    icon={<HiOutlinePlus />}
                                    onClick={() => append({ value: '' })}
                                >
                                    Add Feature
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <Controller
                                            name={`features.${index}.value` as never}
                                            control={control}
                                            render={({ field: inputField }) => (
                                                <Input
                                                    {...inputField}
                                                    placeholder={`Feature ${index + 1}`}
                                                />
                                            )}
                                        />
                                        <Button
                                            size="sm"
                                            type="button"
                                            variant="plain"
                                            icon={<HiOutlineTrash className="text-red-500" />}
                                            onClick={() => remove(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
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

export default SubscriptionEditDialog
