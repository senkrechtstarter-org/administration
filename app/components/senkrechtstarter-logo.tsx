import React from "react";
import { playfair_display } from "./fonts";
import Link from "next/link";
import { Container, Text } from "@mantine/core";

export default function SenkrechtstarterLogo() {
    return (
        <Container px="sm">
            <Link href="/home" style={{ textDecoration: "none" }}>
                <Text
                    // className={`${playfair_display.className}`}
                    variant="gradient"
                    size="xl"
                    fw={900}
                    gradient={{ from: "blue", to: "cyan", deg: 90 }}>
                    Senkrechtstarter Aachen
                </Text>
            </Link>
        </Container>
    );
}
