import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { ContactSupport } from '@/services/ContactService'

type ContactViewDialogProps = {
    isOpen: boolean
    onClose: () => void
    data?: ContactSupport | null
}

const ContactViewDialog = ({
    isOpen,
    onClose,
    data,
}: ContactViewDialogProps) => {
    if (!data) return null

    return (
        <Dialog
            isOpen={isOpen}
            width={800}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <h5 className="mb-4">Contact Details</h5>
            <FormContainer>
                <div className="max-h-[60vh] overflow-y-auto px-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem label="Address Line 1">
                            <Input readOnly value={data.addressLine1} />
                        </FormItem>
                        <FormItem label="Address Line 2">
                            <Input readOnly value={data.addressLine2} />
                        </FormItem>
                        <FormItem label="City">
                            <Input readOnly value={data.city} />
                        </FormItem>
                        <FormItem label="State">
                            <Input readOnly value={data.state} />
                        </FormItem>
                        <FormItem label="Zip Code">
                            <Input readOnly value={data.zipCode} />
                        </FormItem>
                        <FormItem label="Country">
                            <Input readOnly value={data.country} />
                        </FormItem>
                        <FormItem label="Phone Number">
                            <Input readOnly value={data.phoneNumber} />
                        </FormItem>
                        <FormItem label="Email Address">
                            <Input readOnly value={data.emailAddress} />
                        </FormItem>
                    </div>

                    <h6 className="mt-4 mb-3">Social Links</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem label="Facebook URL">
                            <Input readOnly value={data.facebookUrl} />
                        </FormItem>
                        <FormItem label="Instagram URL">
                            <Input readOnly value={data.instagramUrl} />
                        </FormItem>
                        <FormItem label="Twitter URL">
                            <Input readOnly value={data.twitterUrl} />
                        </FormItem>
                        <FormItem label="LinkedIn URL">
                            <Input readOnly value={data.linkedinUrl} />
                        </FormItem>
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

export default ContactViewDialog
