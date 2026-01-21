import { useEffect } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { useForm, Controller } from 'react-hook-form'
import { ContactSupport } from '@/services/ContactService'

type ContactEditDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Omit<ContactSupport, 'id'>) => void
    editingData?: ContactSupport | null
}

const ContactEditDialog = ({
    isOpen,
    onClose,
    onSubmit,
    editingData,
}: ContactEditDialogProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            phoneNumber: '',
            emailAddress: '',
            facebookUrl: '',
            instagramUrl: '',
            twitterUrl: '',
            linkedinUrl: '',
        },
    })

    useEffect(() => {
        if (editingData) {
            reset(editingData)
        } else {
            reset({
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
                phoneNumber: '',
                emailAddress: '',
                facebookUrl: '',
                instagramUrl: '',
                twitterUrl: '',
                linkedinUrl: '',
            })
        }
    }, [editingData, reset, isOpen])

    const onFormSubmit = (data: Omit<ContactSupport, 'id'>) => {
        onSubmit(data)
        onClose()
    }

    return (
        <Dialog
            isOpen={isOpen}
            width={800}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <h5 className="mb-4">
                {editingData ? 'Edit Contact Info' : 'Add Contact Info'}
            </h5>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <FormContainer>
                    <div className="max-h-[60vh] overflow-y-auto px-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormItem
                                label="Address Line 1"
                                invalid={Boolean(errors.addressLine1)}
                                errorMessage={errors.addressLine1?.message}
                            >
                                <Controller
                                    name="addressLine1"
                                    control={control}
                                    rules={{ required: 'Address Line 1 is required' }}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Enter address line 1" />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="Address Line 2"
                                invalid={Boolean(errors.addressLine2)}
                                errorMessage={errors.addressLine2?.message}
                            >
                                <Controller
                                    name="addressLine2"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Enter address line 2" />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="City"
                                invalid={Boolean(errors.city)}
                                errorMessage={errors.city?.message}
                            >
                                <Controller
                                    name="city"
                                    control={control}
                                    rules={{ required: 'City is required' }}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Enter city" />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="State"
                                invalid={Boolean(errors.state)}
                                errorMessage={errors.state?.message}
                            >
                                <Controller
                                    name="state"
                                    control={control}
                                    rules={{ required: 'State is required' }}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Enter state" />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="Zip Code"
                                invalid={Boolean(errors.zipCode)}
                                errorMessage={errors.zipCode?.message}
                            >
                                <Controller
                                    name="zipCode"
                                    control={control}
                                    rules={{ required: 'Zip Code is required' }}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Enter zip code" />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="Country"
                                invalid={Boolean(errors.country)}
                                errorMessage={errors.country?.message}
                            >
                                <Controller
                                    name="country"
                                    control={control}
                                    rules={{ required: 'Country is required' }}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Enter country" />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="Phone Number"
                                invalid={Boolean(errors.phoneNumber)}
                                errorMessage={errors.phoneNumber?.message}
                            >
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    rules={{ required: 'Phone Number is required' }}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Enter phone number" />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="Email Address"
                                invalid={Boolean(errors.emailAddress)}
                                errorMessage={errors.emailAddress?.message}
                            >
                                <Controller
                                    name="emailAddress"
                                    control={control}
                                    rules={{
                                        required: 'Email Address is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Enter email address" />
                                    )}
                                />
                            </FormItem>
                        </div>

                        <h6 className="mt-4 mb-2">Social Links</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormItem
                                label="Facebook URL"
                                invalid={Boolean(errors.facebookUrl)}
                                errorMessage={errors.facebookUrl?.message}
                            >
                                <Controller
                                    name="facebookUrl"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="https://facebook.com/..." />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="Instagram URL"
                                invalid={Boolean(errors.instagramUrl)}
                                errorMessage={errors.instagramUrl?.message}
                            >
                                <Controller
                                    name="instagramUrl"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="https://instagram.com/..." />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="Twitter URL"
                                invalid={Boolean(errors.twitterUrl)}
                                errorMessage={errors.twitterUrl?.message}
                            >
                                <Controller
                                    name="twitterUrl"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="https://twitter.com/..." />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="LinkedIn URL"
                                invalid={Boolean(errors.linkedinUrl)}
                                errorMessage={errors.linkedinUrl?.message}
                            >
                                <Controller
                                    name="linkedinUrl"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="https://linkedin.com/..." />
                                    )}
                                />
                            </FormItem>
                        </div>
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

export default ContactEditDialog
