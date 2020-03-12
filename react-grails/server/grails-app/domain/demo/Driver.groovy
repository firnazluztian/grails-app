package demo

import grails.rest.Resource

@Resource(uri = '/driver')
class Driver {

    String name

    static hasMany = [license: License]

    static constraints = {
        license nullable: true
    }
}
