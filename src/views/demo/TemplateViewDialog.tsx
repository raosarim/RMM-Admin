import { useEffect, useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Template } from '@/services/TemplateService'
import { apiGetLandingModes } from '@/services/LandingModeService'

type TemplateViewDialogProps = {
    isOpen: boolean
    onClose: () => void
    data?: Template | null
}

const TemplateViewDialog = ({
    isOpen,
    onClose,
    data,
}: TemplateViewDialogProps) => {
    const [landingModeName, setLandingModeName] = useState('')

    useEffect(() => {
        if (data && isOpen) {
            const fetchLandingMode = async () => {
                const response = await apiGetLandingModes()
                if (response) {
                    const mode = response.find((m) => m.id === data.landingModeId)
                    setLandingModeName(mode?.title || 'Unknown')
                }
            }
            fetchLandingMode()
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
            <h5 className="mb-4">Template Details</h5>
            <FormContainer>
                <div className="max-h-[70vh] overflow-y-auto px-1 text-gray-900 dark:text-gray-100">
                    <FormItem label="Template Name">
                        <Input readOnly value={data.name} />
                    </FormItem>

                    <FormItem label="Landing Mode">
                        <Input readOnly value={landingModeName} />
                    </FormItem>

                    <div className="mt-4">
                        <h6 className="text-sm mb-2 font-semibold">Thumbnail</h6>
                        {data.thumbnailURL && (
                            <div className="p-2 border rounded-lg inline-block bg-gray-50 dark:bg-gray-800">
                                <img src={data.thumbnailURL} alt={data.name} className="max-w-full h-48 object-contain rounded" />
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

export default TemplateViewDialog
