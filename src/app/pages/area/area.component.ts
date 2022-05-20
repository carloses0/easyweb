import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import * as Highcharts from 'highcharts';
import { OrdemServicoModel } from "src/app/models/ordem-servico.model";
import { OsService } from 'src/app/services/os.service';
import { DatePipe } from '@angular/common'
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { ObserveOnMessage } from "rxjs/internal/operators/observeOn";

@Component({
    selector: 'app-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.scss']
})

export class AreaComponent implements OnInit {

    constructor(private osService: OsService,  public datepipe: DatePipe) {}

    chartOptions: {};
    listOs: Array<OrdemServicoModel> = [];
    nameClients: string[] = [];
    Highcharts = Highcharts;
    dataSource = new MatTableDataSource<OrdemServicoModel>();
    categoriaTempo: string[] = [];
    osValores: Array<number> = [];
    produtoValores: Array<number> = [];
    servicosValores: Array<number> = [];
    valorTotalPorOsProdutos: number;
    valorTotalPorOsServicos: number;
    

    ngOnInit(){
        this.loadOsList();
    }

    async loadOsList() {
        await this.osService.listAll().subscribe( res => {
            this.listOs = res;
            this.listOs.forEach( res => {
                this.nameClients.push(res.orcamento.cliente.nome);
                this.categoriaTempo.push(this.datepipe.transform(res.dataInicio, 'dd-MM-yyyy'));
                this.osValores.push(res.orcamento.valorTotal);
                res.orcamento.produtos.forEach( prod => {
                    this.valorTotalPorOsProdutos = prod.valor * prod.qtd;
                });
                this.produtoValores.push(this.valorTotalPorOsProdutos);

                res.orcamento.servicos.forEach( serv => {
                    this.valorTotalPorOsServicos =+ serv.valor
                });
                this.servicosValores.push(this.valorTotalPorOsServicos);
            });
            this.categoriaTempo.sort();
           
            this.buildGraphic();

        })
        
        console.log(this.listOs);
    };

    buildGraphic(){
        this.chartOptions = {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Ùltimos Registros'
            },
            subtitle: {
                text: 'Balanço EasyCar API'
            },
            xAxis: {
                categories: this.categoriaTempo,
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000;
                    }
                }
            },
            tooltip: {
                split: true,
                valueSuffix: ' Reais'
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [{
                name: 'OS',
                data: this.osValores
            }, {
                name: 'Produtos',
                data: this.produtoValores
            }, {
                name: 'Serviços',
                data: this.servicosValores
            }]
        };
    }
}