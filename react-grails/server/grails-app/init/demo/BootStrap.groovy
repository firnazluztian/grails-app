package demo

import demo.Driver
import demo.Bid
import demo.License

class BootStrap {

    def init = { servletContext ->
        log.info "Loading database..."
        def driver1 = new Driver(name: "Susan").save()
        def driver2 = new Driver(name: "Joe").save()
        def driver3 = new Driver(name: "Peter").save()

        def bid1 = new Bid(date: "2020-01-01", amount: 5000).save()
        def bid2 = new Bid(date: "2020-02-02", amount: 8000).save()
        def bid3 = new Bid(date: "2020-01-01", amount: 5555).save()

        new License(classType: "CLASS_A", licenseNum: 12345678, driver: driver1, bid: bid1).save()
        new License(classType: "CLASS_B", licenseNum: 24682468, , driver: driver2, bid: bid2).save()
        new License(classType: "CLASS_B", licenseNum: 55555555, driver: driver3, bid: bid3).save()

    }
    def destroy = {
    }
}
