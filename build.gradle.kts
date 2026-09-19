plugins {
    java
    // Same load-bearing choice as rbe-gradle-resolve: a THIRD-PARTY plugin
    // resolved through the modern DSL, i.e. through settings-level
    // pluginManagement. Core plugins resolve nothing and would not exercise
    // the registry loopback at all.
    id("com.diffplug.spotless") version "6.25.0"
}

repositories {
    // The loopback must WIN over this rather than sit beside it (IONE-1771).
    mavenCentral()
}

dependencies {
    testImplementation("junit:junit:4.13.2")
}

java {
    toolchain { languageVersion.set(JavaLanguageVersion.of(17)) }
}

spotless {
    java { removeUnusedImports() }
}

tasks.test { testLogging { events("passed", "failed") } }
