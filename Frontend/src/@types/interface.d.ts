interface IPropsOfComponent {
    className?: string;
    children?: ReactNode | string;
    [key: string]: any;
}

interface IOption {
    id: number;
    label: string;
    value: string;
}