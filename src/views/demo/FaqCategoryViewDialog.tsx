import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { FaqCategory } from '@/services/FaqService'

type FaqCategoryViewDialogProps = {
    isOpen: boolean
    onClose: () => void
    data?: FaqCategory | null
}

const FaqCategoryViewDialog = ({
    isOpen,
    onClose,
    data,
}: FaqCategoryViewDialogProps) => {
    if (!data) return null

    return (
        <Dialog
            isOpen={isOpen}
            width={600}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <h5 className="mb-4">FAQ Category Details</h5>
            <FormContainer>
                <div className="max-h-[60vh] overflow-y-auto px-1">
                    <FormItem label="Title">
                        <Input readOnly value={data.title} />
                    </FormItem>
                    <FormItem label="Icon URL">
                        <Input readOnly value={data.iconURL} />
                    </FormItem>
                    {data.iconURL && (
                        <div className="mb-4">
                            <span className="font-semibold block mb-2 text-gray-900 dark:text-gray-100">Icon Preview</span>
                            <div className="p-4 border rounded-lg inline-block">
                                <img src={data.iconURL} alt={data.title} className="w-12 h-12 object-contain" />
                            </div>
                        </div>
                    )}
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

export default FaqCategoryViewDialog
