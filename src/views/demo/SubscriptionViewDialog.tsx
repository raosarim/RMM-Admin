import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { SubscriptionPackage } from '@/services/SubscriptionService'

type SubscriptionViewDialogProps = {
    isOpen: boolean
    onClose: () => void
    data?: SubscriptionPackage | null
}

const SubscriptionViewDialog = ({
    isOpen,
    onClose,
    data,
}: SubscriptionViewDialogProps) => {
    if (!data) return null

    return (
        <Dialog
            isOpen={isOpen}
            width={800}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <h5 className="mb-4">Subscription Package Details</h5>
            <FormContainer>
                <div className="max-h-[70vh] overflow-y-auto px-1 text-gray-900 dark:text-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem label="Package Name">
                            <Input readOnly value={data.packageName} />
                        </FormItem>

                        <FormItem label="Status">
                            <Badge
                                content={data.isActive ? 'Active' : 'Inactive'}
                                innerClass={data.isActive ? 'bg-emerald-500' : 'bg-red-500'}
                            />
                        </FormItem>

                        <FormItem label="Price">
                            <Input readOnly value={`${data.price} / ${data.priceUnit}`} />
                        </FormItem>

                        <FormItem label="Storage">
                            <Input readOnly value={`${data.storageAmount} ${data.storageUnit}`} />
                        </FormItem>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                        <div>
                            <h6 className="text-sm mb-2 font-semibold">Icon</h6>
                            {data.iconURL && (
                                <div className="p-4 border rounded-lg inline-block bg-gray-50 dark:bg-gray-800">
                                    <img src={data.iconURL} alt={data.packageName} className="w-16 h-16 object-contain" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h6 className="text-sm mb-2 font-semibold">Features</h6>
                            <ul className="list-disc list-inside space-y-1">
                                {data.features.map((feature, index) => (
                                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                                        {feature}
                                    </li>
                                ))}
                                {data.features.length === 0 && <li className="text-sm italic text-gray-400">No features listed</li>}
                            </ul>
                        </div>
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

export default SubscriptionViewDialog
