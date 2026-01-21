import { useEffect, useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Faq, FaqCategory, apiGetFaqCategories } from '@/services/FaqService'

type FaqViewDialogProps = {
    isOpen: boolean
    onClose: () => void
    data?: Faq | null
}

const FaqViewDialog = ({
    isOpen,
    onClose,
    data,
}: FaqViewDialogProps) => {
    const [categoryName, setCategoryName] = useState('')

    useEffect(() => {
        if (data && isOpen) {
            const fetchCategory = async () => {
                const response = await apiGetFaqCategories()
                if (response) {
                    const category = response.find((cat) => cat.id === data.categoryId)
                    setCategoryName(category?.title || 'Unknown')
                }
            }
            fetchCategory()
        }
    }, [data, isOpen])

    if (!data) return null

    return (
        <Dialog
            isOpen={isOpen}
            width={600}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <h5 className="mb-4">FAQ Details</h5>
            <FormContainer>
                <div className="max-h-[60vh] overflow-y-auto px-1">
                    <FormItem label="Category">
                        <Input readOnly value={categoryName} />
                    </FormItem>
                    <FormItem label="Question">
                        <Input readOnly value={data.question} />
                    </FormItem>
                    <FormItem label="Answer">
                        <Input readOnly textArea value={data.answer} />
                    </FormItem>
                </div>

                <div className="flex justify-end mt-6">
                    <Button
                        variant="solid"
                        onClick={onClose}
                        className="bg-warning hover:bg-warning-mild border-none text-neutral"
                    >
                        Close
                    </Button>
                </div>
            </FormContainer>
        </Dialog>
    )
}

export default FaqViewDialog
