import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { LandingMode } from '@/services/LandingModeService'

type LandingModeViewDialogProps = {
    isOpen: boolean
    onClose: () => void
    data?: LandingMode | null
}

const LandingModeViewDialog = ({
    isOpen,
    onClose,
    data,
}: LandingModeViewDialogProps) => {
    if (!data) return null

    return (
        <Dialog
            isOpen={isOpen}
            width={700}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <h5 className="mb-4">Landing Mode Details</h5>
            <FormContainer>
                <div className="max-h-[70vh] overflow-y-auto px-1 text-gray-900 dark:text-gray-100">
                    <FormItem label="Title">
                        <Input readOnly value={data.title} />
                    </FormItem>

                    <FormItem label="Description">
                        <Input readOnly textArea value={data.description} />
                    </FormItem>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem label="Landing Mode Type">
                            <Input
                                readOnly
                                value={data.landingModeType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            />
                        </FormItem>

                        <FormItem label="Status">
                            <Badge
                                content={data.isActive ? 'Active' : 'Inactive'}
                                innerClass={data.isActive ? 'bg-emerald-500' : 'bg-red-500'}
                            />
                        </FormItem>
                    </div>

                    <div className="mt-4">
                        <h6 className="text-sm mb-2 font-semibold">Icon</h6>
                        {data.iconURL && (
                            <div className="p-4 border rounded-lg inline-block bg-gray-50 dark:bg-gray-800">
                                <img src={data.iconURL} alt={data.title} className="w-16 h-16 object-contain" />
                            </div>
                        )}
                    </div>
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

export default LandingModeViewDialog
