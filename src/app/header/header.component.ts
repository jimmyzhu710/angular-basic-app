import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthSercie } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private dataStorageService: DataStorageService, private authService: AuthSercie){}

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user=>{
            //this.isAuthenticated = !!user;
            this.isAuthenticated = !user ? false: true;
        });
    }

    ngOnDestroy(){
        this.authService.user.unsubscribe();
    }

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }
}