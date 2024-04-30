import { Component, OnInit } from '@angular/core';
import { ApiConsumerService } from '../api-consumer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  // VARIÁVEIS
  digimons: any[] = [];
  digimons2: any[] = [];
  searchTerm: string = '';
  currentPage = 0;
  itemsPerPage: number = 0;
  selectedLevel: string = 'All';
  selectedDigimon: any;
  modalOpen: boolean = false;
  // END VARIÁVEIS

  constructor(private apiConsumer: ApiConsumerService,) {}

  ngOnInit(): void {
    // RESPONSIVIDADE
    if (window.innerWidth <= 768) {
      this.itemsPerPage = 12;
    } else if (window.innerWidth <= 1024) {
      this.itemsPerPage = 20;
    } else {
      this.itemsPerPage = 24;
    }
    // END RESPONSIVIDADE

    this.loadDigimons();
  }

  // CARREGAR DIGIMONS
  loadDigimons() {
    this.apiConsumer.getAllDigimons().subscribe((data: any) => {
      this.digimons = data;
      this.digimons2 = data;
    });
  }

  // PAGINAÇÃO DOS DIGIMONS
  get paginatedDigimons() {
    const start = this.currentPage * this.itemsPerPage;
    return this.digimons.slice(start, start + this.itemsPerPage);
  }

  goToNextPage() {
    this.currentPage++;
  }

  goToPreviousPage() {
    if (this.currentPage > 0) this.currentPage--;
  }
  // END PAGINAÇÃO

  // FILTROS
  search(name: string) {
    this.searchTerm = name;
    this.updateFilters();
  }

  searchLevel(level: string) {
    this.selectedLevel = level;
    this.updateFilters();
  }

  updateFilters() {
    let filteredDigimons = [...this.digimons2];
  
    if (this.selectedLevel !== 'All') {
      filteredDigimons = filteredDigimons.filter(digimon => digimon.level === this.selectedLevel);
    }
  
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      filteredDigimons = filteredDigimons.filter(digimon =>
        digimon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    this.digimons = filteredDigimons;
    this.currentPage = 0;
  }

  resetSearch() {
    this.searchTerm = '';
    this.currentPage = 0;
    this.loadDigimons();
  }
  // END FILTROS

  // MODAL
  openModalDetails(digimon: any) {
    this.selectedDigimon = digimon;
    this.modalOpen = true;
  }

  closeModalDetails() {
    this.modalOpen = false;
  }
  // END MODAL
}
