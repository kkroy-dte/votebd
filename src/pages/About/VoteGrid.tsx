import React, { useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import {
    ModuleRegistry,
    ClientSideRowModelModule,
    ValidationModule, // <--- এটি যোগ করুন এরর ডিটেইলস দেখার জন্য
    TextFilterModule,
    NumberFilterModule,
    CellStyleModule,
    PaginationModule,

} from 'ag-grid-community';
import { RowGroupingModule, RowGroupingPanelModule, SideBarModule, ColumnsToolPanelModule } from 'ag-grid-enterprise'; // এন্টারপ্রাইজ মডিউল

//সব মডিউল একসাথে রেজিস্টার করুন
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    RowGroupingModule,
    ValidationModule, // এরর মেসেজ ক্লিন করতে এটি দরকার
    TextFilterModule,
    NumberFilterModule,
    CellStyleModule,
    PaginationModule,
    RowGroupingPanelModule,
    SideBarModule,
    ColumnsToolPanelModule
]);

import type { UserDataItem } from '../../types/election';

// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';


const VoteGrid: React.FC<{ rowData: UserDataItem[] }> = ({ rowData }) => {

    const columnDefs: ColDef<UserDataItem>[] = useMemo(() => [
        { field: "id", headerName: "আইডি", hide: true },
        { field: "serial", headerName: "ক্রম", width: 70 },
        { field: "seat", headerName: "সংসদীয় আসন", enableRowGroup: true },
        { field: "district", headerName: "বরিশাল জেলা", enableRowGroup: true },
        { field: "upaOrThana", headerName: "উপজেলা/থানা", enableRowGroup: true },
        { field: "area", headerName: "ইউনিয়ন/পৌর এলাকা/সিটি কর্পোরেশন", enableRowGroup: true, width: 250 },
        { field: "location", headerName: "ভোটকেন্দ্রের নাম ও অবস্থান", width: 300 },
        { field: "room", headerName: "ভোট কক্ষের সংখ্যা", width: 150 },
        {
            field: "name",
            headerName: "ওয়ার্ড/মহল্লা/রাস্তা/গ্রামের নাম",

            width: 250
        },
        {
            field: "male",
            headerName: "পুরুষ",
            headerClass: "header-male",
            cellClass: "text-blue-600 font-bold bg-blue-50/30",
            width: 100
        },
        {
            field: "female",
            headerName: "মহিলা",
            headerClass: "header-female",
            cellClass: "text-pink-600 font-bold bg-pink-50/30",
            width: 100
        },
        {
            field: "third",
            headerName: "হিজড়া",
            cellClass: "text-purple-600 font-bold bg-purple-50/30",
            width: 100
        },
        {
            field: "total",
            headerName: "মোট",
            headerClass: "header-total",
            width: 100,
            cellClass: 'font-bold text-emerald-700'
        },
        { field: "po", headerName: "নিয়ন্ত্রণ কর্মকর্তা" },
        { field: "mobile", headerName: "মোবাইল" },
        { field: "coments", headerName: "মন্তব্য" },
    ], []);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 120,
    }), []);


    // সাইডবার কনফিগারেশন
    // const sideBar = useMemo(() => ({
    //     toolPanels: [
    //         {
    //             id: 'columns',
    //             labelDefault: 'কলাম ফিল্টার',
    //             labelKey: 'columns',
    //             iconKey: 'columns',
    //             toolPanel: 'agColumnsToolPanel',
    //             toolPanelParams: {
    //                 suppressRowGroups: false,
    //                 suppressValues: false,
    //                 suppressPivots: true,
    //                 suppressPivotMode: true,
    //             },
    //         },
    //     ],
    //     // ডিফল্টভাবে সাইডবারটি বন্ধ থাকবে
    //     defaultToolPanel: null
    // }), []);

    // ✅ CORRECT
    const sideBar = {
        toolPanels: [
            {
                id: "columns",
                labelDefault: "Columns",
                labelKey: "columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel", // This string is usually required
                toolPanelParams: {
                    suppressRowGroups: true,
                    suppressValues: true,
                    suppressPivots: true,
                    suppressPivotMode: true,
                },
            },
        ],
        defaultToolPanel: "", // Use empty string instead of null if it's acting up
    };



    const changeSize = useCallback((value: number) => {
        document.documentElement.style.setProperty("--ag-spacing", `${value}px`);
    }, []);

    changeSize(4)

    return (
        <div className="ag-theme-balham font-nikosh" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                sideBar={sideBar} // সাইডবার যুক্ত করা হলো
                animateRows={true}
                groupDefaultExpanded={0} // গ্রপগুলো শুরুতে বন্ধ থাকবে
                pagination={true}
                paginationPageSize={20}
                // বাংলা ফন্ট সাপোর্ট করার জন্য CSS ক্লাস
                containerStyle={{ fontFamily: 'NikoshBAN, sans-serif' }}
                rowGroupPanelShow={"always"}
            // groupDefaultExpanded={0}
            />
        </div>
    );
};

export default VoteGrid;