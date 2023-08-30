import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

//register bike
    registerBike(bike: Bike): void {
        for (const rBike of this.bikes) {
            if (rBike.id === bike.id) {
                throw new Error('Duplicate bike.')
            }
        }
        this.bikes.push(bike)
    }

//remove user
    removeUser(user: User): void {
        let index = this.users.indexOf(user)
        if(index){
            for (const rUser of this.users) {
                if (rUser.email === user.email) {
                    this.users.splice(this.users.indexOf(user,1))
                    console.log("Usuario removido com sucesso!")
                }
            } 
        }
        else throw new Error('Usuário não encontrado')
    }

//rent bike
    rentBike(rents: Rent[], bike: Bike, user: User, startDate: Date, endDate: Date): Rent {
        const rent = Rent.create([], bike, user, startDate, endDate)
        return rent
    }

//return bike
    returnBike(rents: Rent[], ): void {
        let index = this.rents.indexOf(rent.dateTo)
        if(index){
            for (const rRent of this.rents) {
                if (rRent.dateTo === rent.dateTo) {
                    this.rents.splice(this.rents.indexOf(rent,1))
                    console.log("Bike devolvida")
                }
            } 
        }
    }

    findUser(email: string): User | undefined {
        return this.users.find(user => { return user.email === email})
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }
}