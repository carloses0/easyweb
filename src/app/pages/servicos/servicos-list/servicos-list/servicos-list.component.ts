import { ServicoModel } from 'src/app/models/servico.model';
import { ServicosService } from './../../../../services/servicos.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-servicos-list',
  templateUrl: './servicos-list.component.html',
  styleUrls: ['./servicos-list.component.scss', '../../../cliente/client-list/client-list.component.scss']
})
export class ServicosListComponent implements OnInit, AfterViewInit {


    constructor( private servicos: ServicosService, private router: Router, private activateRoute: ActivatedRoute ) { }

    dataSource = new MatTableDataSource<ServicoModel>();

    displayedColumns: string[] = ['nome', 'descricao', 'valor', 'alterar'];

    @ViewChild(MatPaginator, null) paginator: MatPaginator;


    ngOnInit() {
      this.getServicos();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    getServicos() {
      this.servicos.getServicos().subscribe( res => {
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
      this.router.navigate(['servicos-form', id]);
    }

  }

