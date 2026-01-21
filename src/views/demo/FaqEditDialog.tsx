import { useEffect, useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { useForm, Controller } from 'react-hook-form'
import { Faq, FaqCategory, apiGetFaqCategories } from '@/services/FaqService'

type FaqEditDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Omit<Faq, 'id'>) => void
    editingData?: Faq | null
}

const FaqEditDialog = ({
    isOpen,
    onClose,
    onSubmit,
    editingData,
}: FaqEditDialogProps) => {
    const [categories, setCategories] = useState<FaqCategory[]>([])

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            question: '',
            answer: '',
            categoryId: '',
        },
    })

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await apiGetFaqCategories()
            if (response) {
                setCategories(response)
            }
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        if (editingData) {
            reset(editingData)
        } else {
            reset({
                question: '',
                answer: '',
                categoryId: '',
            })
        }
    }, [editingData, reset, isOpen])

    const onFormSubmit = (data: Omit<Faq, 'id'>) => {
        onSubmit(data)
        onClose()
    }

    const categoryOptions = categories.map((cat) => ({
        value: cat.id,
        label: cat.title,
    }))

    return (
        <Dialog
            isOpen={isOpen}
            width={600}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <h5 className="mb-4">
                {editingData ? 'Edit FAQ' : 'Add FAQ'}
            </h5>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <FormContainer>
                    <div className="max-h-[60vh] overflow-y-auto px-1">
                        <FormItem
                            label="Category"
                            invalid={Boolean(errors.categoryId)}
                            errorMessage={errors.categoryId?.message}
                        >
                            <Controller
                                name="categoryId"
                                control={control}
                                rules={{ required: 'Category is required' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={categoryOptions}
                                        value={categoryOptions.find(
                                            (option) => option.value === field.value
                                        )}
                                        onChange={(option) => field.onChange(option?.value)}
                                        placeholder="Select Category"
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            label="Question"
                            invalid={Boolean(errors.question)}
                            errorMessage={errors.question?.message}
                        >
                            <Controller
                                name="question"
                                control={control}
                                rules={{ required: 'Question is required' }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Enter your question" />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            label="Answer"
                            invalid={Boolean(errors.answer)}
                            errorMessage={errors.answer?.message}
                        >
                            <Controller
                                name="answer"
                                control={control}
                                rules={{ required: 'Answer is required' }}
                                render={({ field }) => (
                                    <Input
                                        textArea
                                        {...field}
                                        placeholder="Enter the answer"
                                    />
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

export default FaqEditDialog
