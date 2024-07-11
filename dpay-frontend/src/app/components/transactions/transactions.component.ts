import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { LocalstoreService } from '../../services/localstore.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, Grid, GridApi, GridReadyEvent} from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [AgGridAngular, FontAwesomeModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements OnInit {
  public rowData: any[] = [];
  public rowsPerPage: number = 10;
  public pageNum: number = 0;
  public walletId: string = '';

  public pagination = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 20, 50, 100];

  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: false,
  };
  public themeClass: string = "ag-theme-quartz-dark";

  public colDef: ColDef[] = [
    {
      headerName: 'Date',
      field: 'date',
      valueFormatter: (p) => this.datePipe.transform(p.value || '', 'dd/MM/yyyy hh:mm a') || "",
      comparator: (valueA, valueB) => {
        return new Date(valueA).valueOf() - new Date(valueB).valueOf();
      },
      flex: 1,
    },
    {
      headerName: 'Description',
      field: 'description',
      flex: 2,
    },
    {
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: (p) => `₹ ${p.value || 0}`,
      flex: 1,
    },
    {
      headerName: 'Type',
      field: 'type',
      flex: 1,
      filter: true
    },
    {
      headerName: 'Closing Balance',
      field: 'balance',
      valueFormatter: (p) => `₹ ${p.value || 0}`,
      flex: 1,
    },
  ];

  private gridApi!: GridApi;

  public getRowClass(param: any) {
    return param && param.data.type == 'CREDIT' ? 'credit-row' : 'debit-row'
  }

  public onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  public exportToCSV() {
    this.gridApi.exportDataAsCsv({allColumns: true})
  }

  constructor(
    private walletService: WalletService,
    private localStore: LocalstoreService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.walletId = this.localStore.getWalletId();
    this.walletService.getTransaction(this.walletId, this.pageNum).subscribe(
      (respose) => {
        this.rowData = respose;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
