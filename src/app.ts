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
        if(index != null){
            for (const rUser of this.users) {
                if (rUser.email === user.email) {
                    this.users.splice(this.users.indexOf(user,1))
                    console.log("Usuario removido com sucesso!")
                }
            } 
        }
        else console.log('Usuário não encontrado')
    }

//rent bike
    rentBike(bike: Bike, user: User, startDate: Date, endDate: Date): void {
        let result = this.rents.filter((rent) => rent.bike == bike);
            let aluguel = Rent.create(result, bike, user, startDate, endDate)
            console.log("Sucesso! Bike alugada e pronta para ser retirada na data especificada!")
            this.rents.push(aluguel)
    }

//return bike
    returnBike(bike: Bike): void {
        let found = this.rents.find((rent) => rent.bike == bike && rent.dateReturned != null);
        if (found) {
            found.dateReturned = new Date()
            console.log("Bike devolvida!")
        }
    }


    findUser(email: string): User | undefined {
        let procura = this.users.find(user => { return user.email === email})
        return procura
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