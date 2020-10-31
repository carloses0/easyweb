import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProdutoService} from "../../services/produto.service";
import {ToastrService} from "ngx-toastr";
import {ProdutoModel} from "../../models/produto.model";
import {MatTableDataSource} from "@angular/material";
import {ClienteModel} from "../../models/cliente-models/cliente.model";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {


  formulario: FormGroup;
  produto: ProdutoModel;
  listProdutos: ProdutoModel[] = [];

  pesquisaNome: String;

  dataSource = new MatTableDataSource<ProdutoModel>();
  displayedColumns: string[] = ['nome', 'valor', 'marca'];

  constructor(private router: Router, private routeActivate: ActivatedRoute, private produtoService: ProdutoService, private toastNotification: ToastrService) {
  }

  ngOnInit() {
    this.initForm();
    this.listall();
  }


  initForm() {
    this.formulario = new FormGroup({
      valor: new FormControl(),
      descricao: new FormControl(),
      nome: new FormControl(),
      marca: new FormControl(),
      categoria: new FormControl()
    });
  }

  salvarProduto() {
    this.buildForSave();
    this.onSalvar();
  }

  onSalvar() {
    this.produtoService.saveProduto(this.produto).subscribe(response => {
      if (response) {
        this.toastNotification.success(' Produto foi salvo com sucesso.');
        this.router.navigate(['/produtos']);

      }
    }, error => this.toastNotification.error('Falha ao salvar, por favor tente novamente mais tarde.'));
  }

  buildForSave() {
    this.produto = new ProdutoModel(
      null,
      +this.formulario.controls['valor'].value,
      this.formulario.controls['descricao'].value,
      this.formulario.controls['nome'].value,
      this.formulario.controls['marca'].value,
      this.formulario.controls['categoria'].value,
    );
  }

  excluirProduto(id: number) {

  }

  listall() {
    this.produtoService.getProdutos().subscribe( response => {
        this.dataSource.data = response;
    });
  };


  pesquisarPorNome() {
    this.getProdutoByName(this.pesquisaNome);
  }

  getProdutoByName(name: String){
    let returnList: ProdutoModel[] = [];
      this.produtoService.getProdutoByName(name).subscribe( (produtoReturn: ProdutoModel) => {
          if(produtoReturn){
            returnList.push(produtoReturn);
          }
        this.dataSource.data = returnList;
      })
  }


}
