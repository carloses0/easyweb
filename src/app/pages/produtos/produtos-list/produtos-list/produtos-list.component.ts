import { ProdutoModel } from './../../../../models/produto.model';
import { ProdutoService } from './../../../../services/produto.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit, AfterViewInit {

  constructor( private produtosService: ProdutoService, private router: Router, private activateRoute: ActivatedRoute ) { }

    dataSource = new MatTableDataSource<ProdutoModel>();

    displayedColumns: string[] = ['nome', 'descricao', 'valor', 'alterar'];

    @ViewChild(MatPaginator, null) paginator: MatPaginator;


    ngOnInit() {
      this.getProdutos();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    getProdutos() {
      this.produtosService.getProdutos().subscribe( res => {
        this.dataSource.data = res;
      });
    }

    onEdit(id: any) {
      this.router.navigate(['produtos-form', id]);
    }

}
