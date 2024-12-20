package com.clinicadental.enums;

import java.util.Arrays;
import java.util.List;

public enum Role {

    ADMIN(Arrays.asList(Permission.READ, Permission.WRITE)),
    USER(Arrays.asList(Permission.READ));

    private List<Permission> permissions;

    Role(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }
}