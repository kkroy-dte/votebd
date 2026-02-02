/* src/types/election.ts */



export interface Seat {
    id: string;
    name: string; // e.g., "বরিশাল-১"
}

export interface Upazila {
    id: string;
    seatId: string; // Links to Seat
    name: string;   // e.g., "গৌরনদী"
}

export interface ElectionArea {
    id: string;
    upazilaId: string; // Links to Upazila
    name: string;      // e.g., "গৌরনদী পৌরসভা"
}


export interface FormState {
    division: string; // Parliamentary Seat
    district: string; // Upazila
    thana: string;    // Election Area
}

export interface Option {
    id: string | number;
    value: string;
    label: string;
    parentId?: string;
}



export interface ChartState {
    male: string;
    female: string;
    third: string;
    total: string;
}

// export interface FormState {
//     division: string;
//     district: string;
//     thana: string;
// }

// export interface Option {
//     id: string | number;
//     value: string;
//     label: string;
//     parentId?: string;
//}



// Type definition for consistency
export interface UserDataItem {
    id: string;
    serial: string;
    seat: string;
    district: string;
    upaOrThana: string;
    area: string;
    location: string;
    room: string;
    name: string;
    male: string;
    female: string;
    third: string;
    total: string;
    po: string;
    mobile: string;
    coments: string;
}

export interface StatsDashboardProps {
    data: UserDataItem[];
}



export interface DependentFormProps {
    onFilterChange: (newData: UserDataItem[]) => void; // এখানে টাইপ নির্দিষ্ট করে দিন
}


export interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedRow: UserDataItem;
}


export interface GenderDataItem {
    name: string;
    value: number;
}

export interface LegendClickPayload {
    value: string;
    type: string;
    id: string;
    payload: {
        name: string;
        value: number;
        fill: string;
    };
}