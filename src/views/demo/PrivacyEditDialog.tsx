import { useEffect } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import RichTextEditor from '@/components/shared/RichTextEditor'
import { useForm, Controller } from 'react-hook-form'
import { PrivacyPolicy } from '@/services/PrivacyService'

type PrivacyEditDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Omit<PrivacyPolicy, 'id' | 'updatedAt'>) => void
    editingData?: PrivacyPolicy | null
}

import DatePicker from '@/components/ui/DatePicker'
import Select from '@/components/ui/Select'

type Option = {
    value: string
    label: string
}

const typeOptions: Option[] = [
    { value: 'privacy_policy', label: 'Privacy Policy' },
    { value: 'terms_and_conditions', label: 'Terms and Conditions' },
]

const PrivacyEditDialog = ({
    isOpen,
    onClose,
    onSubmit,
    editingData,
}: PrivacyEditDialogProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            type: '',
            content: '',
            effectiveDate: new Date().toISOString(),
        },
    })

    useEffect(() => {
        if (editingData) {
            reset({
                title: editingData.title,
                type: editingData.type,
                content: editingData.content,
                effectiveDate: editingData.effectiveDate,
            })
        } else {
            reset({
                title: '',
                type: '',
                content: '',
                effectiveDate: new Date().toISOString(),
            })
        }
    }, [editingData, reset, isOpen])

    const onFormSubmit = (data: {
        title: string
        type: string
        content: string
        effectiveDate: string | Date
    }) => {
        onSubmit({
            ...data,
            effectiveDate:
                data.effectiveDate instanceof Date
                    ? data.effectiveDate.toISOString()
                    : data.effectiveDate,
        })
        onClose()
    }

    return (
        <Dialog
            isOpen={isOpen}
            width={700}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <h5 className="mb-4">
                {editingData ? 'Edit Privacy Policy' : 'Add Privacy Policy'}
            </h5>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <FormContainer>
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
                                <Input
                                    {...field}
                                    placeholder="Enter policy title"
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Type"
                        invalid={Boolean(errors.type)}
                        errorMessage={errors.type?.message}
                    >
                        <Controller
                            name="type"
                            control={control}
                            rules={{ required: 'Type is required' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={typeOptions}
                                    value={typeOptions.find(
                                        (option) => option.value === field.value,
                                    )}
                                    onChange={(option) =>
                                        field.onChange(option?.value)
                                    }
                                    placeholder="Select Type"
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Effective Date"
                        invalid={Boolean(errors.effectiveDate)}
                        errorMessage={errors.effectiveDate?.message}
                    >
                        <Controller
                            name="effectiveDate"
                            control={control}
                            rules={{ required: 'Effective Date is required' }}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    value={
                                        field.value
                                            ? new Date(field.value)
                                            : null
                                    }
                                    onChange={(date) => field.onChange(date)}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Content"
                        invalid={Boolean(errors.content)}
                        errorMessage={errors.content?.message}
                    >
                        <Controller
                            name="content"
                            control={control}
                            rules={{ required: 'Content is required' }}
                            render={({ field }) => (
                                <RichTextEditor
                                    content={field.value}
                                    onChange={(content) =>
                                        field.onChange(content.html)
                                    }
                                />
                            )}
                        />
                    </FormItem>
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

export default PrivacyEditDialog
