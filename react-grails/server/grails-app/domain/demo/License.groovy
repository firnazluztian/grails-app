package demo

import grails.rest.Resource

@Resource(uri = '/license')
class License {

    String classType
    Integer licenseNum

    Bid bid

    static belongsTo = [driver: Driver]

    static constraints = {
        driver nullable: true
    }
}
