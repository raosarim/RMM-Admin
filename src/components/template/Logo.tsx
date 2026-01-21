import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
}

const LOGO_SRC_PATH = '/img/logo/Group.svg'

const Logo = (props: LogoProps) => {
    const {
        type = 'full',
        mode = 'light',
        className,
        imgClass,
        style,
        logoWidth = 'auto',
    } = props

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <img
                className={imgClass}
                src={`${LOGO_SRC_PATH}`}
                alt={`${APP_NAME} logo`}
            />
            {type === 'full' && (
                <p className="font-bold ltr:ml-2 rtl:mr-2 italic whitespace-nowrap">
                    {APP_NAME}
                </p>
            )}
        </div>
    )
}

export default Logo
