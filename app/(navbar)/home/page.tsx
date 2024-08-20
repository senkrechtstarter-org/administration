"use client";

import { Card, CardBody, Tabs, Tab } from "@nextui-org/react";

export default function Page() {
    return (
        <div className="p-6">
            <h2 className={"mt-2 text-3xl"}>How to Senkrechtstarter</h2>
            <Tabs aria-label="Dynamic tabs" variant="underlined">
                <Tab title="Willkommen!">
                    <Card>
                        <CardBody className="p-8">
                            Schön, dass du neu bei Senkrechtstarter dabei bist!
                            Dieses Merkblatt soll dir den Einstieg in der Gruppe
                            hier in Aachen etwas erleichtern, selbstverständlich
                            kannst du aber auch jeden aus der Gruppe mit Fragen
                            löchern.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab title="Email">
                    <Card>
                        <CardBody className="p-8">
                            <div>
                                Über die aachen@senkrechtstarter.orgorganisieren
                                wir ALLES was mit Senkrechtstarter zutun hat.
                                Dies sind unter anderem Schulbesuche, andere
                                Veranstaltungen, Anfragen an andere Städte ob
                                sie für uns Patenschaften übernehmen können und
                                vieles mehr. Jeder aus der Senkrechtstarter
                                Aachen Gruppe kennt das Passwort und kann so die
                                Dinge organisieren für die er zuständig ist und
                                gleichzeitig kann auf diese Art und Weise
                                schnell kommuniziert werden, wenn es Neuerungen
                                gibt. Auch kannst du so sehen, wenn sich
                                schonmal jemand mit der gleichen Schule oder
                                Angelegenheit befasst hat wie du. Du kannst dich
                                über folgende Website und Zugangsdaten
                                einloggen:
                            </div>
                            <div>Website: https://webmail.all-inkl.com</div>
                            <div>
                                E-Mail: aachen@senkrechtstarter.orgPasswort:
                                AC_WfgUN4
                            </div>
                            <b>Dropbox</b>
                            <div>
                                In der Dropbox findest du alle Materialien die
                                in irgendeiner Form mit Senkrechtstarter zutun
                                haben. Aktuell ist diese etwas unübersichtlich,
                                da wird sich aber etwas ändern und dann ist es
                                für dich ein leichtest dich zurechtzufinden
                                JSuchst du also eine PowerPoint, den letzten
                                Halbjahresbericht, Fotos oder Beispielemails
                                bist du hier genau richtig. Benutzername:
                                aachen@senkrechtstarter.orgPasswort: AC_WfgUN4
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab title="Schulbesuche">
                    <Card>
                        <CardBody className="p-8">
                            <div>
                                Was wir bei Senkrechtstarter machen um unserem
                                Ziel näher zu kommen möglichst vielen
                                Schülerinnen und Schülern auf dem Weg zu ihrer
                                Studienentscheidung zu helfen sind die folgenden
                                Schritte:
                            </div>

                            <b>Kontakt zu den Schulen aufnehmen</b>
                            <div>
                                Dies passiert meistens erstmal per Mail oder
                                telefonisch. Oft erhält man keine Rückmeldung
                                oder wird weitergeleitet, sodass dann oft auch
                                ein persönlicher Besuch oder ein Gespräch mit
                                den Oberstufenkoordinatoren oder zuständigen
                                Lehrkräften folgt.
                            </div>

                            <b>Schulbesuch</b>
                            <div>
                                Dies passiert dann im Rahmen einer
                                Berufsorientierungsveranstaltung Formate gibt es
                                viele, aber das Ziel ist immer das selbe: wir
                                halten unseren Vortrag oder stehen für Fragen
                                zur Verfügung um möglichst viele Schülerinnen
                                und Schüler für das Projekt zu gewinnen.
                            </div>
                            <b>Liste der interessierten Schüler: </b>
                            <div>
                                Nach den Schulbesuchen beginnt für uns die
                                eigentliche Arbeit: wir haben eine Liste von
                                Schülerinnern und Schülern, die sich mit
                                Studienwunsch und Kontaktdaten in unser Formular
                                eingetragen haben diese müssen nun auf unserer
                                Seite Stipendiaten zugeteilt werden, die eine
                                Patenschaft übernehmen wollen.
                            </div>
                            <div>
                                Dafür gibt es ein (halbwegs) standardisiertes
                                Vorgehen, welches in der Datei "Patenzuteilung"
                                genauer erklärt ist. Auch hier wird sich in
                                Zukunft wahrscheinlich etwas ändern.
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
