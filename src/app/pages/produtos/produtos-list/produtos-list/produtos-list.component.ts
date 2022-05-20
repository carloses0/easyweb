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

    displayedColumns: string[] = ['nome', 'descricao', 'valor', 'editar'];

    @ViewChild(MatPaginator, null) paginator: MatPaginator;


    ngOnInit() {
      this.getProdutos();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    getProdutos() {
      this.produtosService.getProdutos().subscribe( res => {
        let listFiltro = res;
        listFiltro.forEach( data => {
          res.forEach( prod => {
            let index = listFiltro.findIndex(item => item.nome === prod.nome);
      
            if(data.nome == prod.nome && data.id != prod.id) {
              listFiltro.splice(index,1)                            
            }
          })
        });
        this.dataSource.data = listFiltro;
      });
    }

    onEdit(id: any) {
      this.router.navigate(['produtos-form', id]);
    }

}
