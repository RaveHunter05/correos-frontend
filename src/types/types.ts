export type Incomes = {
    incomeId: any;
    serviceId: number;
    costCenterId: number;
    projectedAmount: number;
    executedAmount: number;
    date: Date | string;
};

export type Expenses = {
    expenseId: any;
    costCenterId: number;
    spentId: number;
    projectedAmount: number;
    executedAmount: number;
    date: Date | string;
};

export type CostCenters = {
    costCenterId: number;
    gerencyCode: string;
    areaCode: string;
    officeCode: string;
    code: string;
    name: string;
    date: Date | string;
};

export type Services = {
    serviceId: number;
    code: string;
    name: string;
    date: Date | string;
};

export type Spents = {
    spentId: number;
    category: string;
    denomination: string;
    date: Date | string;
};
