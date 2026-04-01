import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu-item',
  imports: [RouterModule],
  template: `
    <a
      [routerLink]="path()"
      routerLinkActive="bg-gray-800"
      class="flex justify-start items-center p-2 rounded-md text-white hover:bg-gray-800 transition-colors"
    >
      <i class="{{ icon() }} text-2xl mr-4 text-indigo-400"></i>
      <div class="flex flex-col grow">
        <span class="text-white text-lg font-semibold">{{ title() }}</span>
        <span class="text-gray-400 text-sm">{{ description() }}</span>
      </div>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuItem {
  icon = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
  path = input.required<string>();
}
