import { Service } from "../service";
import {
  BillsPayableMonthListDTO,
  BillsPayableMonthOutPutDTO,
  InputGetBillsPayableMonth,
} from "@/domain/Bill/bill.dto";
import { HttpGateway } from "@/domain/Http/http.gateway";
import { BASE_API_PATHS } from "@/infra/constants/base-api-paths.constants";

type InputDTO = InputGetBillsPayableMonth;

const BILLS_DATA: BillsPayableMonthOutPutDTO[] = [
  {
    id: "1",
    descriptionBill: "Aluguel",
    amount: 1500,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Moradia e Manutencao Residencial",
    status: "DUE_DAY",
  },
  {
    id: "2",
    descriptionBill: "Nubank",
    amount: 2340.5,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Despesa com Cartão de crédito",
    status: "OVERDUE",
  },
  {
    id: "3",
    descriptionBill: "Plano de Saúde",
    amount: 120,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Cuidados com pets",
    status: "DUE_SOON",
  },
  {
    id: "4",
    descriptionBill: "Claro Tv",
    amount: 90,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Assinatura de Internet, Telefonia e Streamings",
    status: "PENDING",
  },
  {
    id: "5",
    descriptionBill: "Feira do mês",
    amount: 850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Supermercado",
    status: "PAID",
  },
  {
    id: "6",
    descriptionBill: "IPTU",
    amount: 3850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Serviços e Utilidades Públicas",
    status: "PAID",
  },
  {
    id: "7",
    descriptionBill: "Compras no Shopping 121212121",
    amount: 850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Vestuário e Acessórios",
    status: "DUE_SOON",
  },
  {
    id: "8",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
  {
    id: "9",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
  {
    id: "10",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
  {
    id: "11",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
  {
    id: "12",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
  {
    id: "13",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
  {
    id: "14",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
  {
    id: "15",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
  {
    id: "16",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
  {
    id: "17",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
  {
    id: "18",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
  {
    id: "19",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
  {
    id: "20",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
];

export class GetBillsPayableMonthService
  implements Service<InputDTO, Promise<BillsPayableMonthListDTO>>
{
  constructor(private readonly http: HttpGateway["get"]) {}

  private pagination(page: number, size: number) {
    const totalElements = BILLS_DATA.length;

    const totalPages = Math.ceil(BILLS_DATA.length / size);

    let content: BillsPayableMonthOutPutDTO[] = [];

    if (page > 0) {
      content = BILLS_DATA.slice(page * size, page * size + size);
    } else {
      content = BILLS_DATA.slice(0, size);
    }

    return {
      content,
      totalElements,
      totalPages,
      page: Number(page),
      size: Number(size),
    } as BillsPayableMonthListDTO;
  }

  async execute({
    initialDate,
    finalDate,
    ...rest
  }: InputDTO): Promise<BillsPayableMonthListDTO> {
    // const response = await this.http<BillsPayableMonthListDTO>(
    //   BASE_API_PATHS.BILL.by_month_status,
    //   { queries: { ...rest, initialDate, finalDate }, cache: "no-store" }
    // );

    await new Promise((r) => setTimeout(r, 400));
    const response = this.pagination(rest.page, rest.size);

    return response;
  }
}
