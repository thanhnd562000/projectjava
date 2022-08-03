import { Component, OnInit } from '@angular/core';
import { Orderhistory } from 'src/app/common/orderhistory.model';
import { OrderhistoryService } from 'src/app/core/services/orderhistory.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  constructor(private historySrvice:OrderhistoryService) { }

  orderHistoryList:Orderhistory[]=[];
  storage:Storage=sessionStorage;
  ngOnInit(): void {
    this.handleListOrderHistory();
  }
  handleListOrderHistory() {
    const theEmail=JSON.parse(this.storage.getItem('userEmail')!);
   this.historySrvice.GetOrderHistory(theEmail).subscribe(
    data=>{
      this.orderHistoryList=data._embedded.orders;
      console.log(this.orderHistoryList);
    }
   )
  }

}
